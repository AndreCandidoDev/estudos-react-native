import { useEffect, useState } from "react"
import { FieldErrors, Noop } from "react-hook-form"
import { TextInput, StyleSheet } from "react-native"

interface DateInputProps {
    onChange: (...event: any[]) => void
    onBlur: Noop
    errors: FieldErrors<OrderData>
    value: string
    editable: boolean
}

export const DateInput: React.FC<DateInputProps> = ({
    onChange,
    onBlur,
    errors,
    value,
    editable,
}) =>
{
    const [dataValue, setDateValue] = useState<string>("")

    const parseInitial = (date: string): string =>
    {
        return date.split("-").reverse().join("/")
    }

    useEffect(() => 
    {
        setDateValue(parseInitial(value))
    }, [value])

    const formatInput = (value: string): string => 
    {
        const numbers = value.replace(/\D/g, '')

        if (numbers.length <= 2) 
        {
            return numbers
        }

        if (numbers.length <= 4) 
        {
            return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
        }

        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
    }

    const parseDateValue = (date: string): string =>
    {
        return date.split("/").reverse().join("-")   
    }

    const handleChange = (text: string): void =>
    {
        const value = formatInput(text)

        setDateValue(value)

        const parsedDate = parseDateValue(value)

        onChange(parsedDate)
    }

    return (
        <TextInput
            style={{ ...styles.input, borderColor: errors.order_date ? "red" : "" }}
            onBlur={onBlur}
            onChangeText={(e) => handleChange(e)}
            value={dataValue}
            maxLength={10}
            keyboardType="numeric"
            editable={editable}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        width: "100%",
        borderWidth: 1,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        backgroundColor: "#f6f3f3"
    }
})