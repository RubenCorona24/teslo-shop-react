import { Button } from "@base-ui/react/button"
import { useCounterStoreTest } from "./test_zustand"

export const ProductPageTest = () => {
    const { inc, dec, count } = useCounterStoreTest()
    return (
        <>
            <h1 className="text-3xl font-montserrat">Count: {count}</h1>
            <Button onClick={inc}>+1</Button>
            <Button onClick={dec}>-1</Button>
        </>

    )
}