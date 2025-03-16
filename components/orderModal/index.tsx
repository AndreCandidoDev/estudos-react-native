import { apiData } from "@/types/apiData"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Modal, View, StyleSheet, Button, Text, TextInput, Alert } from "react-native"
import { OptionsInput } from "../inputs/optionsInput"
import { DateInput } from "../inputs/dateInput"

interface OrderModalProps {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    data?: apiData | null
}

const statusOptions = [
    {
        label: "Aguardando Pagamento",
        value: "pending"
    },
    {
        label: "Pago",
        value: "completed"
    }
]

export const OrderModal: React.FC<OrderModalProps> = ({ 
    openModal,
    setOpenModal,
    data
}) =>
{
    const { control, handleSubmit, formState: { errors }, reset } = useForm<OrderData>()

    useEffect(() => 
    {
        if(data)
        {
            reset({
                customer_name: data.customer_name,
                customer_email: data.customer_email,
                order_date: data.order_date,
                amount_in_cents: String(data.amount_in_cents),
                status: data.status,
            })
        }
    }, [data])

    const handleForm = async (data: OrderData): Promise<void> =>
    {        
        const myHeaders = new Headers()
     
        myHeaders.append("Content-Type", "application/json")

        const raw = JSON.stringify(data)

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        }

        try
        {
            const result = await fetch("https://apis.codante.io/api/orders-api/orders", requestOptions)
    
            if(result.ok)
            {
                const response = await result.json()
                console.log(response)
    
                Alert.alert("Pedido Criado", "O pedido foi cadastrado no sistema")
                setOpenModal(false)
            }
        }
        catch(e)
        {
            Alert.alert("Erro", "Não foi possivel criar o pedido")
        }
    }

    return (
        <Modal
            animationType="fade"
            visible={openModal}
            transparent={true}
            onRequestClose={() => setOpenModal(false)}
        >
            <View style={styles.addModal}>
                <View style={styles.modalHeader}>
                    <Text style={styles.title}>{data ? "Vizualizar Pedido" : "Adicionar Pedido"}</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Nome do Cliente</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={{ ...styles.input, borderColor: errors.customer_name ? "red" : "" }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    editable={data?.customer_name ? false : true}
                                />
                            )}
                            name="customer_name"
                            rules={{ required: 'Campo Obrigatório' }}
                            defaultValue=""
                        />
                        {errors.customer_name && <Text style={styles.errorText}>{errors.customer_name.message}</Text>}
                    </View>
                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Email do Cliente</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    keyboardType="email-address"
                                    style={{ ...styles.input, borderColor: errors.customer_email ? "red" : "" }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    editable={data?.customer_email ? false : true}
                                />
                            )}
                            name="customer_email"
                            rules={{ 
                                required: 'Campo Obrigatório', 
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Email Inválido'
                                }
                            }}
                            defaultValue=""
                        />
                        {errors.customer_email && <Text style={styles.errorText}>{errors.customer_email.message}</Text>}
                    </View>
                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Data do Pedido</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <DateInput 
                                    onChange={onChange} 
                                    onBlur={onBlur} 
                                    errors={errors}
                                    value={value}
                                    editable={data?.order_date ? false : true}
                                />
                            )}
                            name="order_date"
                            rules={{ required: 'Campo Obrigatório' }}
                            defaultValue=""
                        />
                        {errors.order_date && <Text style={styles.errorText}>{errors.order_date.message}</Text>}
                    </View>
                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Valor do Pedido</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    keyboardType="number-pad"
                                    style={{ ...styles.input, borderColor: errors.amount_in_cents ? "red" : "" }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    editable={data?.amount_in_cents ? false : true}
                                />
                            )}
                            name="amount_in_cents"
                            rules={{ required: 'Campo Obrigatório' }}
                            defaultValue=""
                        />
                        {errors.amount_in_cents && <Text style={styles.errorText}>{errors.amount_in_cents.message}</Text>}
                    </View>
                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Status do Pedido</Text>
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: 'Campo obrigatório' }}
                            defaultValue=""
                            render={({ field: { onChange, value }}) => (
                                <OptionsInput 
                                    options={statusOptions} 
                                    onChange={onChange}
                                    value={value}
                                    editable={data?.status ? false : true}
                                />
                            )}
                        />
                        {errors.status && <Text style={styles.errorText}>{errors.status.message}</Text>}
                    </View>
                </View>          
                <View style={styles.footer}>
                    <Button 
                        title={!data ? "Cancelar" : "Fechar"} 
                        color={'#ff6060'} 
                        onPress={() => setOpenModal(false)}
                    />
                    {!data && (
                        <Button title="Salvar" onPress={handleSubmit(handleForm)}/>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    addModal: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        position: "relative"
    },
    modalHeader: {
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ccc",    
    },
    title: {
        fontWeight: "700",
        fontSize: 20
    },
    content: {
        padding: 20,
        height:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBlockColor: "black",
        width: "100%",
        gap: 20,
    },
    inputControl: {
        width: "100%",
        display: 'flex',
        flexDirection: "column",
        gap: 5        
    },
    input: {
        padding: 5,
        width: "100%",
        borderWidth: 1,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        backgroundColor: "#f6f3f3"

    },
    label: {
        fontWeight: "bold",
        fontSize: 10
    },
    errorText: {
        color: "red",
        fontWeight: "bold",
        fontSize: 10
    },
    footer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#ccc",
        gap: 10
    }
})