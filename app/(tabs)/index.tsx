import Foundation from '@expo/vector-icons/Foundation';
import { apiData } from "@/types/apiData";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList, Alert } from "react-native";
import { OrderModal } from '@/components/orderModal';

export default function testScreen()
{
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [data, setData] = useState<apiData[]>([])
    const [selectedData, setSelectedData] = useState<apiData | null>(null)

    const getOrders = async ():Promise<void> =>
    {
        const url = "https://apis.codante.io/api/orders-api/orders"

        try
        {
            const result = await fetch(url)
            
            if(result.ok)
            {
                const parse = await result.json()
            
                setData(parse.data)
            }
        }
        catch(e)
        {
            Alert.alert("Erro", "Erro ao buscar dados.")
        }
    }

    useEffect(() => 
    {
        getOrders()
    }, [])

    const handleSelectData = (selected: apiData): void =>
    {
        setSelectedData(selected)
        setOpenModal(true)
    }

    const handleAddData = (): void =>
    {
        setSelectedData(null)
        setOpenModal(true)
    }

    return (
        <View style={styles.testScreen}>
            <View style={styles.top}>
                <Text style={styles.title}>Pedidos</Text>
                <Button
                    title='Atualizar'
                    onPress={() => getOrders()}
                />
                <Button
                    color={"green"}
                    title="Adicionar"
                    onPress={() => handleAddData()}
                /> 
            </View>
            <View style={styles.content}>
                <View style={styles.headerTable}>
                    <Text style={styles.cell}>ID</Text>
                    <Text style={styles.cell}>Cliente</Text>
                    <Text style={styles.cell}>Valor</Text>
                    <Text style={styles.cell}></Text>
                </View>
                {data.length > 0 && (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.cell}>{item.id}</Text>
                                <Text style={styles.cell}>{item.customer_name}</Text>
                                <Text style={styles.cell}>{item.amount_in_cents}</Text>
                                <View style={styles.cell}>
                                    <Foundation name="pencil" size={24} color="black" onPress={() => handleSelectData(item)}/>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => String(item.id)}
                    />
                )}
            </View>
            {openModal && (
                <OrderModal 
                    openModal={openModal} 
                    setOpenModal={setOpenModal}
                    data={selectedData}
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
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center"
    },
    linkText: {
        color: "blue",
        fontWeight: "bold"
    }
})