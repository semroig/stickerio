'use client'

import { ChakraProvider } from '@chakra-ui/react'

import SignUpForm from '@/components/custom/signUpForm'

// Componente que sirve para decorar con chakra provider
export default function SignUpFormWrapper() {
    return (
        <ChakraProvider>
            <SignUpForm />
        </ChakraProvider>
    )
}
