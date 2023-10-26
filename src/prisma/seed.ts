/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}


function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'ff105551-0f0d-4a9f-bc41-c559c8a17260',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'fg105551-0f0d-4a9f-bc41-c559c8a17260',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'fh105551-0f0d-4a9f-bc41-c559c8a17260',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'ff105551-0f0d-4a9f-bc41-c559c8a17260',
      name: 'Joana Doe',
      address: '123 Main Street, London'
    },
    {
      id: 'fg105551-0f0d-4a9f-bc41-c559c8a17260',
      name: 'TThomas Jefferson',
      address: 'Baker Street 12B, New York'
    },
    {
      id: 'fh105551-0f0d-4a9f-bc41-c559c8a17260',
      name: 'John Smith',
      address: 'Baker Street 12B, Philadelphia'
    }
  ];
}

async function seed() {
  await Promise.all(
    getClients().map((client) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          client: {
            connect: { id: clientId },
          },
        },
      });
    }),
  );
}

seed();