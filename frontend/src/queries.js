import { gql } from "@apollo/client"

export const USE_ITEM_BY_ID = gql`
  mutation UpdateItems($id: ID, $state: Boolean) {
    updateItems(where: {id: $id}, update: {parent: {update: {edge: {in_use: $state}}}}) {
      items {
        id
        name
      }
    }
  }
`

export const GET_ITEM_BY_ID = gql`
  query GetItemByID($id: ID) {
    items(where: {id: $id}) {
      id
      name
      quantity
      notes
      lastModified
      parent {
        name
      }
      parentConnection {
        edges {
          in_use
        }
      }
    }
  }
`

export const DELETE_ITEM_BY_ID = gql`
  mutation DeleteItemByID($id: ID) {
    deleteItems(where: {id: $id}) {
      nodesDeleted
    }
  }
`

export const DELETE_CONTAINER_BY_ID = gql`
  mutation DeleteContainerByID($id: ID) {
    deleteContainers(where: {id: $id}) {
      nodesDeleted
    }
  }
`

export const GET_ALL_CONTAINERS = gql`
  query GetAllContainers {
    containers {
      id
      name
      lastModified
      parent {
        name
      }
      childrenConnection {
        totalCount
      }
    }
  }
`

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    items {
      id
      name
      quantity
      lastModified
      parent {
        name
      }
      parentConnection {
        edges {
          in_use
        }
      }
    }
  }
`

export const ADD_NEW_ITEM = gql`
  mutation AddItem($name: String, $quantity: Int!, $notes: String, $cid: ID) {
    createItems(
      input: [
        {
          name: $name
          quantity: $quantity
          notes: $notes
          parent: {
            connectOrCreate: {
              where: {node: {id: $cid}}
              onCreate: {
                node: { name: "Unknown Container" }
                edge: { in_use: false }
              }
            }
          }
        }
      ]
    ) {
      items {
        id
      }
    }
  }
`

export const ADD_NEW_ROOT_CONTAINER = gql`
  mutation createContainers($name: String, $description: String) {
    createContainers(input: [
        {
          name: $name
          description: $description
        }
    ]) {
        containers {
          id
        }
    }
  }
`

export const ADD_NEW_SUB_CONTAINER = gql`
  mutation createContainers($name: String, $description: String, $cid: ID) {
    createContainers(input: [
        {
          name: $name
          description: $description
          parent: {
            connect: {
              where: { node: { id: $cid } }
            }
          }
        }
    ]) {
        containers {
          id
        }
    }
  }
`

export const GET_ROOT_CONTAINERS = gql`
  query getRootContainers {
    containers(where: {parent: null}) {
      id
      name
      children {
        ... on Container {
          id
          name
          children {
            id
            name
            ... on Container {
              children {
                id
                name
                ... on Container {
                  children {
                    id
                    name
                    ... on Container {
                      children {
                        id
                        name
                        ... on Container {
                          children {
                            id
                            name
                            ... on Container {
                              children {
                                id
                                name
                                ... on Container {
                                  children {
                                    id
                                    name
                                    ... on Container {
                                      children {
                                        id
                                        name
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ... on Item {
          id
          name
        }
      }
    }
  }
`

export const GET_CONTENTS = gql`
  query getRootContainers($cid: ID) {
    containers(where: {id: $cid}) {
      id
      name
      children {
        ... on Container {
          id
          name
          children {
            id
            name
            ... on Container {
              children {
                id
                name
                ... on Container {
                  children {
                    id
                    name
                    ... on Container {
                      children {
                        id
                        name
                        ... on Container {
                          children {
                            id
                            name
                            ... on Container {
                              children {
                                id
                                name
                                ... on Container {
                                  children {
                                    id
                                    name
                                    ... on Container {
                                      children {
                                        id
                                        name
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ... on Item {
          id
          name
        }
      }
    }
  }
`

export const GET_CHILD_CONTAINERS = gql`
  query GetChildBYID($cid: ID) {
    containers(where: {id: $cid}) {
      id
      name
      children {
        name
        id
        ... on Container {
          name
          id
          children {
            name
            id
          }
        }
      }
    }
  }
`

export const GET_USED_ITEMS = gql`
  query GetUsedItems{
    itemsConnection(
      where: {
        parentConnection: {
          edge: {
            in_use: false
          }
        }
      }
    ) {
      edges {
        node {
          id
          name
        }
      }
    } 
  }
`

export const UPDATE_ITEM_USAGE = gql`
  mutation UpdateItems($item_id: ID, $value: Boolean) {
    updateItems(
      where: { id: $item_id },
      update: { parent: { update: { edge : { in_use: $value } } } }
    ) {
      items {
        id
        name
      }
    }
  }
`

export const GET_TOTAL_ITEM_COUNT = gql`
  query GetTotalItemCount {
    itemsAggregate {
      quantity {
      sum 
      }
    }
  }
`

export const GET_TOTAL_CONTAINER_COUNT = gql`
  query GetTotalContainerCount {
    containersAggregate {
      count
    }
  }
`

export const LAST_MODIFIED_CONTAINER = gql`
  query MostRecentContainer {
    itemsAggregate  {
      lastModified {
        max
      }
    }
  }
`

export const ALL_USED_ITEMS = gql`
  query GetUsedItemsCount{
    itemsAggregate(where: { parentConnection: { edge: {in_use: true} } }) {
      count    
    }
  }
`

export const ITEMS_BY_CONTAINER_ID = gql`
  query ItemsByContainerID {
    items(where: {parentConnection: {node: {id: ""}}}) {
      id
      name
      quantity
    }
  }
`

export const GET_CONTAINER_BY_ID = gql`
  query getContainerByID($id: ID) {
    containers(where: {id: $id}) {
      id
      name
      lastModified
      parent {
        id
        name
      }
      children {
        id
        name
      }
    }
  }
`