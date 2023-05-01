import * as Dialog from '@radix-ui/react-dialog'
import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  RadioItem,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react'

export default function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="text" required placeholder="Descrição" />
          <input type="text" required placeholder="Preço" />
          <input type="text" required placeholder="Categoria" />
          <TransactionType>
            <RadioItem variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </RadioItem>
            <RadioItem variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </RadioItem>
          </TransactionType>
          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
