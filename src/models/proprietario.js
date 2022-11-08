import prisma from '../utils/connection'
import { gql } from 'apollo-server-micro'


const typeDefs = gql`
type Proprietario {
    id: ID!
    nome: String!
    email: String!
    cpf: String
}

extend type Query {
  getProprietarios: [Proprietario!]!
}

extend type Mutation {
  createProprietario(nome: String, email: String, cpf: String): Int
  deleteProprietario(id: Int): Int
  # updateProprietario(id: Int): Int
}
`

const resolvers = {
    Query: {
      getProprietarios: () => {
        return prisma.proprietario.findMany();
      }
    },

    Mutation: {
      createProprietario: async (parent, args) => {
        const proprietario = await prisma.proprietario.create({data: args})
        return proprietario.id;
      },
      deleteProprietario: async (parent, args) => {
        const proprietario = await prisma.proprietario.delete({ where: { id: parseInt(args.id) }, })
        return proprietario.id;
      },
    }
}

export { typeDefs, resolvers }
