import retry from 'async-retry'
const waitForAllServices = async () => {

    const waitForWebServer = async () => {
        const fetchStatusPage = async () => {
            const response = await fetch("http://localhost:3000/api/v1/status");
            await response.json();

        }

        return retry(fetchStatusPage, {
            retries: 100
        })
    }
    await waitForWebServer();
}

const orchestrator = { waitForAllServices };
export default orchestrator;