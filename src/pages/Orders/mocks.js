// Mock de pedidos pendentes para desenvolvimento offline

export const mockPedidos = [
  {
    id: 1,
    codigo: '1001',
    nomeCliente: 'Empresa Alpha',
    cnpj: '12.345.678/0001-90',
    valor: 790.00,
    vencimento: '2024-07-01',
  },
  {
    id: 2,
    codigo: '1002',
    nomeCliente: 'Beta Indústria',
    cnpj: '98.765.432/0001-10',
    valor: 1200.50,
    vencimento: '2024-07-05',
  },
  {
    id: 3,
    codigo: '1003',
    nomeCliente: 'Gamma Serviços',
    cnpj: '11.222.333/0001-44',
    valor: 350.75,
    vencimento: '2024-07-10',
  },
  {
    id: 4,
    codigo: '1004',
    nomeCliente: 'Delta Comércio',
    cnpj: '22.333.444/0001-55',
    valor: 980.00,
    vencimento: '2024-07-12',
  },
  {
    id: 5,
    codigo: '1005',
    nomeCliente: 'Epsilon Ltda',
    cnpj: '33.444.555/0001-66',
    valor: 150.00,
    vencimento: '2024-07-15',
  },
  // Adicione mais pedidos conforme necessário
];

// Função para simular busca paginada e filtrada
export function buscarPedidosMock({ nome = '', cnpj = '', codigo = '', page = 1, pageSize = 10 }) {
  let filtrados = mockPedidos.filter(p =>
    (!nome || p.nomeCliente.toLowerCase().includes(nome.toLowerCase())) &&
    (!cnpj || p.cnpj.replace(/\D/g, '').includes(cnpj.replace(/\D/g, ''))) &&
    (!codigo || p.codigo.includes(codigo))
  );
  const totalPages = Math.ceil(filtrados.length / pageSize) || 1;
  const items = filtrados.slice((page - 1) * pageSize, page * pageSize);
  return Promise.resolve({ items, totalPages });
} 