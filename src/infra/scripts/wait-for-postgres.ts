import { exec, ExecException } from 'node:child_process';

const handlerReturn = (_err: ExecException | null, stdout: string): void => {
  if (stdout.includes('accepting connections')) {
    console.log("\n🟢 Postgres iniciado com sucesso!\n");
    return;
  }
  process.stdout.write('.');
  setTimeout(checkPostgres, 1000);
};

const checkPostgres = (): void => {
  exec('docker exec postgres-dev pg_isready --host localhost', handlerReturn);
};

process.stdout.write("\n\n🟡 Aguardando Postgres iniciar...");
checkPostgres();
