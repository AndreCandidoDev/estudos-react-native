import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface OptionsInputProps {
    options: { label: string, value: string }[]
    onChange: (...event: any[]) => void
    value: string
    editable: boolean
}

export const OptionsInput: React.FC<OptionsInputProps> = ({ 
    options, 
    onChange, 
    value,
    editable 
}) =>
{
    const [selected, setSelected] = useState<string | null>(null)

    useEffect(() => 
    {
        if(value !== "")
        {
            const initial = options.find((item) => item.value === value)
            
            if(initial)
            {
                setSelected(initial?.value)
            }
        }
    }, [value, options])

    const handleSelect = (item: { label: string, value: string }): void =>
    {
        if(editable)
        {
            setSelected(item.value)
            onChange(item.value)
        }
    }

    return (
        <View style={styles.optionsInput}>
            {options.map((item, key) => (
                <TouchableOpacity
                    key={key}
                    onPress={() => handleSelect(item)}
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