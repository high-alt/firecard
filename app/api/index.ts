import {
  Form,
  FormFieldTypeOld,
  GetPresignType,
} from "utils/types"
type FetcherFn<T, P extends any[]> = (...params: P) => Promise<T>

export type BadRequestType = {
  error: string
}

export type FetchResponse<T> = {
  data: T
  error?: string | null
}

export const fetchFn = async <T>(
  path?: string,
  init?: RequestInit
): Promise<T> => {
  const token = null
  console.log("got here")
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `${path}`, {
    method: init?.method ?? "GET",
    headers: init?.headers ?? {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: init?.body ?? undefined,
  })

  if (res.status === 302) {
    throw new Error(res.headers.get("Location") ?? "")
  }

  if (res.status === 200) {
    const json = (await res.json()) as Promise<T>
    console.log(json)
    return json
  }

  if (res.status === 400 || 500) {
    const message = await res.text()

    throw new Error(message)
  }

  throw new Error("something went wrong")
}

// export function useQ<T, P extends any[] = any[]>(
//   fetchFn: FetcherFn<T, P>,
//   params?: P,
//   options?: Omit< UseQueryOptions<T, unknown, T, (string | P[number])[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined }
// ): UseQueryResult<T> {
//   const p = params ?? ([] as unknown as P)
//   const fetcher = async () => {
//     try {
//       const data = await fetchFn(...p)
//       return data
//     } catch (error) {
//       throw new Error("Fetching failed")
//     }
//   }

//   const queryKey = [fetchFn.name, ...p]
//   return useQuery({queryKey, queryFn: fetcher, ...options})
// }

// export function useM<T, P extends>(
//   mutateFn: MutationFunction<T, P>,
//   options?: UseMutationOptions<T, unknown, P, unknown>
// ): UseMutationResult<T, unknown, P, unknown> {
//   return useMutation(mutateFn, options)
// }

export enum HttpVerb {
  GET = "GET",
  HEAD = "HEAD",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type PresignedRequestParams = {
  verb?: HttpVerb
  expires?: Date
  bucket?: string
  contentType: string
}

export async function addMedia(file: File, options: PresignedRequestParams) {
  const opts = JSON.stringify(options)
  console.log(opts)

  const res = await fetchFn<GetPresignType>(`/Media/${file.name}`, {
    method: "POST",
    body: JSON.stringify(options),
  })

  if (!res) throw new Error("Could not upload file")

  const uploadFile = await fetch(res.url)

  if (!uploadFile.ok) {
    throw new Error("Could not upload file")
  }

  return await uploadFile
}

export type StartTranscriptionJobParams = {
  contentType: string
  method?: "GET" | "PUT" | "DELETE"
  expires?: Date
  bucket?: string
}

export async function startTranscription(
  path: string,
  filename: string,
  options: StartTranscriptionJobParams
) {
  const requestBody = {
    opts: options,
  }
  const opts = JSON.stringify(requestBody)
  console.log(opts)

  const res = await fetchFn(`/Media/job`, {
    method: "POST",
    body: JSON.stringify(options),
  })

  return res
}

export const uploadToS3 = async (data: {
  file: File
  presignedUrl: string
}) => {
  if (!data.file || !data.presignedUrl)
    throw new Error("File or presignedUrl missing.")

  const response = await fetch(data.presignedUrl, {
    method: "PUT",
    body: data.file,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Upload error: ${errorText}`)
  }

  return "File uploaded successfully!"
}

export const getPayment = async () => {
  const res = await fetchFn("/Payment")
  console.log(res)
  return res
}

export const createCheckoutSession = async () => {
  const res = await fetchFn("/Payment/create-checkout-session", {
    method: "POST",
  })
  console.log(res)
  return res
}

export const createForm = async (data: Form) => {
  const res = await fetchFn(`/Form/create`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  console.log(res)
  return res
}

export const getForm = async (formId: string) => {
  const res = await fetchFn(`/Form/${formId}`)
  console.log(res)
  return res as Promise<FormFieldTypeOld[]>
}

export const createConnectAccount = async () => {
  const res = await fetchFn(`/Connect`)

  return res
}

export const getProducts = async () => {
  const res = await fetchFn(`/Product`)

  return res
}

export const logout = async () => {}
