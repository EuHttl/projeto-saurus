import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Orders.css";
import { buscarPedidosMock } from "./mocks";

const Spinner = () => <div className="spinner"></div>;

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    nome: "",
    cnpj: "",
    codigo: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const params = {
        Page: currentPage,
        PageSize: 10,
        ...(filters.nome && { RazaoSocial: filters.nome }),
        ...(filters.cnpj && { Cnpj: filters.cnpj }),
        ...(filters.codigo && { NumFatura: filters.codigo }),
      };

      // --- USANDO MOCK ---
      const { items, totalPages } = await buscarPedidosMock({
        nome: filters.nome,
        cnpj: filters.cnpj,
        codigo: filters.codigo,
        page: currentPage,
        pageSize: 10,
      });
      setOrders(items);
      setTotalPages(totalPages);

      // --- utilizando api ---
      // const response = await api.get("/api/v2/financeiro/faturas", { params });
      // setOrders(response.data.items || []);
      // setTotalPages(response.data.totalPages || 1);
      // --- pedir acesso ---

    } catch (err) {
      setError("Não foi possível carregar os pedidos.");
      console.error("Erro ao buscar pedidos:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, filters, navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectOrder = (orderId) => {
    const pedido = orders.find((o) => o.id === orderId);
    navigate(`/pagamento/${orderId}`, { state: { pedido } });
  };

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Pedidos Pendentes</h1>
      </header>

      <div className="filters-container">
        <input
          className="filter-input"
          type="text"
          name="nome"
          placeholder="Nome do Cliente"
          value={filters.nome}
          onChange={handleFilterChange}
        />
        <input
          className="filter-input"
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={filters.cnpj}
          onChange={handleFilterChange}
        />
        <input
          className="filter-input"
          type="text"
          name="codigo"
          placeholder="Código da Fatura"
          value={filters.codigo}
          onChange={handleFilterChange}
        />
      </div>

      <div className="orders-list">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Vencimento</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4">Nenhum pedido encontrado.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => handleSelectOrder(order.id)}
                  >
                    <td>{order.codigo}</td>
                    <td>{order.nomeCliente}</td>
                    <td>R$ {order.valor.toFixed(2)}</td>
                    <td>{new Date(order.vencimento).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default Orders;
