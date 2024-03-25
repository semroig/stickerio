'use client';

import { ChakraProvider } from '@chakra-ui/react'
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box
  } from '@chakra-ui/react'

const estados = [
    {
        title: 'Pendiente',
        value: "pendiente",
        label: "Confirmacion de pago",
        indice: 0
    },
    {
        title: 'Preparacion',
        value: "preparacion",
        label: "Armando tu pedido",
        indice: 1
    },
    {
        title: 'Enviado',
        value: "viaje",
        label: "En viaje",
        indice: 2
    },
    {
        title: 'Listo :)',
        value: "recibido",
        label: "Pedido entregado",
        indice: 4
    }
];

export default function ProgressBar ({ estado }: any) {
    let indice = 0;
    estados.forEach(element => {
        if (element.value === estado) indice = element.indice;
    })

    const { activeStep } = useSteps({
        index: indice,
        count: estados.length,
    })

    return (
        <Box position="relative" mx={100}>
            <ChakraProvider>
                <Stepper index={activeStep} colorScheme='green'>
                    {estados.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.label}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            </ChakraProvider>
        </Box>
    )
}