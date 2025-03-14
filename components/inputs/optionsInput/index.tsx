import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface OptionsInputProps {
    options: { label: string, value: string }[],
    onChange: (...event: any[]) => void
}

export const OptionsInput: React.FC<OptionsInputProps> = ({ options, onChange }) =>
{
    const [selected, setSelected] = useState<string | null>(null)

    return (
        <View style={styles.optionsInput}>
            {options.map((item, key) => (
                <TouchableOpacity
                    key={key}
                    onPress={() => {
                        setSelected(item.value)
                        onChange(item.value)
                    }}
                    style={[
                        styles.option,
                        item.value === selected && styles.selectedOption,
                    ]}
                >
                    <Text 
                        style={{...styles.optionText, color: item.value === selected ? "white" : ""}}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    optionsInput: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 20
    },
    option: {
        borderWidth: 1,
        padding: 10,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
    },
    selectedOption: {
        backgroundColor: '#2196F3',
        color: "white"
    },
    optionText: {
        fontSize: 16,
        color: 'black',
    },
})