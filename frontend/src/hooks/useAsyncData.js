/* O padrao "buscar no efeito e guardar no estado" fica isolado aqui dentro. */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'

/**
 * Executa `fetcher` (precisa ser estavel, via useCallback) e devolve o estado
 * da requisicao. Refaz a busca quando `fetcher` muda e descarta respostas de
 * requisicoes que ficaram pelo caminho.
 *
 * @param {Function} fetcher funcao assincrona que devolve os dados
 * @param {*} initial valor usado enquanto a primeira resposta nao chega
 */
export function useAsyncData(fetcher, initial = null) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => { if (active) setData(result) })
      .catch((err) => {
        if (active) setError(err.message)
        console.error('Falha ao carregar dados da API:', err)
      })
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [fetcher])

  return { data, loading, error }
}
