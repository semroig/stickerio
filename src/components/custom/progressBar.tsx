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

import { STATES } from '@/app/constants';

export default function ProgressBar ({ estado, orientacion }: any) {
    let indice = 0;
    STATES.forEach(element => {
        if (element.value === estado) indice = element.indice;
    })

    const { activeStep } = useSteps({
        index: indice,
        count: STATES.length,
    })

    return (
        <Box position="relative" maxW='lg'>
            <ChakraProvider>
                <Stepper
                    index={activeStep}
                    colorScheme='green'
                    orientation={orientacion}
                    height={orientacion === 'vertical' ? '300px' : ''}
                >
                    {STATES.map((step, index) => (
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