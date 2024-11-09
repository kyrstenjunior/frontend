"use client"

import { use } from "react"
import { OrderProps } from "@/lib/order.type"
import { FiRefreshCw } from "react-icons/fi"
import ModalOrder from "@/app/dashboard/components/modal"
import { OrderContext } from "@/app/providers/order"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
    orders: OrderProps[];
}

function Orders({ orders }: Props) {

    const { isOpen, onRequestOpen } = use(OrderContext);
    const router = useRouter();

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id);
    }

    function handleRefresh() {
        router.refresh();
        toast.success("Pedidos atualizados com sucesso!");
    }

  return (
    <>
        <main className="max-w-720 my-5 mx-auto px-4 flex flex-col justify-between">
            <section className="flex gap-3 items-center mb-4 mt-6">
                <h1>Últimos pedidos</h1>
                <button onClick={handleRefresh}>
                    <FiRefreshCw size={24} color="#3fffa3" />
                </button>
            </section>

            <section className="flex flex-col gap-4">
                { 
                    orders.length === 0 ? <span className="text-gray-500">Nenhum pedido aberto no momento...</span> : (
                        orders.map(order => {
                            return (
                                <button
                                    key={order.id}
                                    className="bg-slate-950 flex items-center text-lg rounded-lg transition-all duration-500 hover:brightness-150"
                                    onClick={() => handleDetailOrder(order.id)}
                                >
                                    <div className="bg-emerald-400 w-2 h-14 rounded-es-lg rounded-ss-lg mr-4"></div>
                                    <span>Mesa {order.table}</span>
                                </button>
                            )
                        })
                    )
                }
            </section>
        </main>
        
        { isOpen && <ModalOrder /> }
    </>
  )
}

export default Orders