import { Modal, View, StyleSheet, Button, Text } from "react-native"

interface AddModalProps {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddModal: React.FC<AddModalProps> = ({ 
    openModal,
    setOpenModal
}) =>
{
    return (
        <Modal
            animationType="fade"
            visible={openModal}
            transparent={true}
            onRequestClose={() => setOpenModal(false)}
        >
            <View style={styles.addModal}>
                <View style={styles.modalHeader}>
                    <Text style={styles.title}>Adicionar Pedido</Text>
                    <Button
                        title="Fechar"
                        onPress={() => setOpenModal(false)}
                    />
                </View>
                <View style={styles.content}>
                    
                </View>          
                <View style={styles.footer}>
                    <Button title="Cancelar" color={'#ff6060'}/>
                    <Button title="Salvar"/>
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
        height:"100%"
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