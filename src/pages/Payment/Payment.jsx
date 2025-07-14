import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Payment.css";

const Spinner = () => <div className="spinner"></div>;

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    const [ order ] = useState(location.state?.pedido);
    const [ isLoading, setIsLoading] = useState(true);
    const [ error, setError ] = useState("");
    const [ methodsPayment, setMethodsPayment ] = useState('Crédito');
    const [ cardData, setCardData ] = useState({ numero: "", validade: "", cvv: "" });
    const [ pixKey, setPixKey ] = useState("");
    const [ status, setStatus ] = useState("idle");

    // Detecta se está em modo mock
    const isMock = localStorage.getItem("authToken") === "token_falso_para_dev";

    useEffect(() => {
        if (!order) {
            navigate("/pedidos");
            return;
        }
        setIsLoading(false);
    }, [order, navigate]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setError("");

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um delay de 1 segundo

        try {
            if (isMock) {
                setStatus("success");
                alert("Pagamento feito com sucesso!");
                navigate("/pedidos");
                return;
            }

            // Dados da transação para enviar para a API
            const transactionData = {
                pedidoId: order.id,
                codigo: order.codigo,
                valor: order.valor,
                formaPagamento: methodsPayment,
                dadosPagamento: methodsPayment === "PIX" ? { chavePix: pixKey } : cardData,
                timestamp: new Date().toISOString()
            };

            // Enviar para o endpoint /financeiro/retorno
            await api.post("/financeiro/retorno", transactionData);
            
            setStatus("success");
            alert("Pagamento realizado com sucesso!");
            navigate("/pedidos");
        } catch (error) {
            setStatus("error");
            setError(error.message || "Erro desconhecido ao processar o pagamento.");
        }
    }

    return (
        <div className="payment-container">
            <h1 className="payment-title">Pagamento</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="payment-content">
                    <section className="payment-details">
                        <h2>Detalhes do Pedido</h2>
                        <div className="details-row"><span>Código:</span> <strong>{order.codigo}</strong></div>
                        <div className="details-row"><span>Cliente:</span> <strong>{order.nomeCliente}</strong></div>
                        <div className="details-row"><span>CNPJ:</span> <strong>{order.cnpj}</strong></div>
                        <div className="details-row"><span>Valor:</span> <strong>R$ {order.valor.toFixed(2)}</strong></div>
                        <div className="details-row"><span>Vencimento:</span> <strong>{new Date(order.vencimento).toLocaleDateString()}</strong></div>
                    </section>
                    <form onSubmit={handlePayment} className="payment-form">
                        <h2>Forma de Pagamento</h2>
                        <div className="payment-methods">
                            <button type="button" className={methodsPayment === 'Crédito' ? 'active' : ''} onClick={() => setMethodsPayment('Crédito')}>Crédito</button>
                            <button type="button" className={methodsPayment === 'Débito' ? 'active' : ''} onClick={() => setMethodsPayment('Débito')}>Débito</button>
                            <button type="button" className={methodsPayment === 'PIX' ? 'active' : ''} onClick={() => setMethodsPayment('PIX')}>PIX</button>
                        </div>
                        {methodsPayment === "Crédito" || methodsPayment === "Débito" ? (
                            <div className="card-fields">
                                <input
                                    type="text"
                                    placeholder="Número do Cartão"
                                    value={cardData.numero}
                                    onChange={(e) => setCardData({ ...cardData, numero: e.target.value })}
                                    required
                                    className="payment-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Validade (MM/AA)"
                                    value={cardData.validade}
                                    onChange={(e) => setCardData({ ...cardData, validade: e.target.value })}
                                    required
                                    className="payment-input"
                                />
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    value={cardData.cvv}
                                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                                    required
                                    className="payment-input"
                                />
                            </div>
                        ) : methodsPayment === "PIX" ? (
                            <input
                                type="text"
                                placeholder="Chave PIX"
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                                required
                                className="payment-input"
                            />
                        ) : null}
                        <button type="submit" className={`payment-button ${status}`}>
                            {status === "loading" ? "Processando..." : "Pagar"}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default Payment;