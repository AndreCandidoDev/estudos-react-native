import { AddModal } from "@/components/AddModal";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";

type apiData = {
    id: number
    customer_name: string
    customer_email: string
    order_date: string
    amount_in_cents: number
    status: string
    created_at: string
    updated_at: string
}

export default function testScreen()
{
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [data, setData] = useState<apiData[]>([])

    const getOrders = async ():Promise<void> =>
    {
        const url = "https://apis.codante.io/api/orders-api/orders"

        const result = await fetch(url)

        if(result.ok)
        {
            const parse = await result.json()
        
            setData(parse.data)
        }
    }

    useEffect(() => 
    {
        getOrders()
    }, [])

    return (
        <View style={styles.testScreen}>
            <View style={styles.top}>
                <Text style={styles.title}>Pedidos</Text>
                <Button
                    color={"green"}
                    title="Adicionar"
                    onPress={() => setOpenModal(true)}
                /> 
            </View>
            <View style={styles.content}>
                <View style={styles.headerTable}>
                    <Text style={styles.cell}>Name</Text>
                    <Text style={styles.cell}>Email</Text>
                    <Text style={styles.cell}>Amount</Text>
                </View>
                {data.length > 0 && (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.cell}>{item.customer_name}</Text>
                                <Text style={styles.cell}>{item.customer_email}</Text>
                                <Text style={styles.cell}>{item.amount_in_cents}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => String(item.id)}
                    />
                )}
            </View>
            {openModal && (
                <AddModal 
                    openModal={openModal} 
                    setOpenModal={setOpenModal}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    testScreen: {
        backgroundColor: "#ccc",
        height: "100%",
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    top: {
        padding: 15,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black"
    },
    content: {
        flex: 1,
        padding: 10,
    },
    headerTable: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
})