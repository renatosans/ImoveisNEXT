import prisma from '../utils/connection'
import { gql } from 'apollo-server-micro'


const typeDefs = gql`
type Imovel {
    id: ID!
    endereco: String!
    descricao: String!
    valorVenda: Float
    valorLocacao: Float
}

extend type Query {
    getImoveis: [Imovel!]!
}

extend type Mutation {
  createImovel(endereco: String, descricao: String, valorVenda: Float, valorLocacao: Float): Int
  deleteImovel(id: Int): Int
  # updateImovel(id: Int): Int
}
`

const resolvers = {
    Query: {
      getImoveis: () => {
        return prisma.imovel.findMany();
      }
    },

    Mutation: {
      createImovel: async (parent, args) => {
        const imovel = await prisma.imovel.create({data: args})
        return imovel.id;
      },
      deleteImovel: async (parent, args) => {
        const imovel = await prisma.imovel.delete({ where: { id: parseInt(args.id) }, })
        return imovel.id;
      },
    }
}

export { typeDefs, resolvers }
