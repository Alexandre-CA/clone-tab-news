
it("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    expect(response.status).toBe(200);
});


it("GET to /api/v1/status should correct Body", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const responseBody = await response.json();

    const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();

    expect(responseBody).toEqual({
        updated_at: parsedUpdateAt,
        dependencies: {
            database: {
                version: expect.any(String),
                max_connections: expect.any(Number),
                opened_connections: 1,
            }
        }
    })
})
