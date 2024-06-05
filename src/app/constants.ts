export const SIZES = [
    {
        value: "chico",
        label: "Chico 4x4 - $450",
        shortLabel: "Chico 4x4",
        price: 450
    },
    {
        value: "grande",
        label: "Grande 7x7 - $600",
        shortLabel: "Grande 7x7",
        price: 600
    },
    {
        value: "gigante",
        label: "Gigante 10x10 - $750",
        shortLabel: "Gigante 10x10",
        price: 750
    },
];

export const PAPERS = [
    {
      value: "blanco",
      label: "Blanco mate",
    },
    {
        value: "transparente",
        label: "Transparente",
    },
    {
        value: "holografico",
        label: "Holografico",
    }
]

export const METODOS_ENTREGA = [
    // { 
    //     value: "correo",
    //     label: "Envío por correo",
    //     price: 4300,
    //     description: "Disponible para todo el país. Llega en los proximos 5-8 dias habiles."
    // },
    {
        value: "moto",
        label: "Envio por moto",
        price: 3890,
        description: "Disponible solo para Ciudad de Buenos Aires. Llega entre 1-2 días hábiles."
    },
    {
        value: "retiro",
        label: "Retiro en persona",
        price: 0,
        description: "De lunes a viernes entre las 8hs y 17hs por Villa Urquiza, Ciudad de Buenos Aires. Disponible a partir de mañana!"
    }
];

export const STATES = [
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