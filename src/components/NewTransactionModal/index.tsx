import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  RadioItem,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionContext'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export default function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data
    await createTransaction({ description, price, category, type })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            required
            placeholder="Descrição"
            {...register('description')}
          />
          <input
            type="text"
            required
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            required
            placeholder="Categoria"
            {...register('category')}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              console.log(field)
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <RadioItem variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </RadioItem>
                  <RadioItem variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </RadioItem>
                </TransactionType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
