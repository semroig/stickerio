export const SIZES = [
    {
      value: "chico",
      label: "Chico 4x4 - $400",
      shortLabel: "Chico 4x4",
      price: 400
    },
    {
        value: "grande",
        label: "Grande 7x7 - $550",
        shortLabel: "Grande 7x7",
        price: 550
    }
    // {
    //   value: "mediano",
    //   label: "6x6 - $400",
    // },
]

export const METODOS_ENTREGA = [
  { 
      value: "correo",
      label: "Envio por correo",
      price: 3650,
      description: "Disponible para todo el pais. Llega en los proximos 10 dias."
  },
  {
      value: "moto",
      label: "Envio por moto",
      price: 2000,
      description: "Disponible solo para Ciudad de Buenos Aires. Llega en los proximos 5 dias."
  },
  {
      value: "retiro",
      label: "Retiro en persona",
      price: 0,
      description: "De lunes a viernes entre las 8hs y 17hs por Villa Urquiza, Ciudad de Buenos Aires. Disponible a partir de manana!"
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