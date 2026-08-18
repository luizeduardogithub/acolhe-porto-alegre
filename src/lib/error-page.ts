export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Esta página não carregou — AcolhePOA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #f4f7f6; color: #10221f; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      .badge { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 700; color: #0f5c63; margin: 0 0 .6rem; }
      h1 { font-size: 1.4rem; margin: 0 0 0.5rem; }
      p { color: #4b5f5c; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #0f5c63; color: #fff; }
      .secondary { background: #fff; color: #0f5c63; border-color: #cfdedb; }
      .foot { margin-top: 2rem; font-size: .78rem; color: #7b8b89; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="badge">Ops</p>
      <h1>Esta página não carregou</h1>
      <p>Algo deu errado do nosso lado. Tente novamente em instantes ou volte para o início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar de novo</button>
        <a class="secondary" href="/">Ir para o site</a>
      </div>
      <p class="foot">AcolhePOA — protótipo demonstrativo.</p>
    </div>
  </body>
</html>`;
}
