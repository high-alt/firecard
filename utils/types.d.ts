export type MetaElement = {
  attributes: MetaAttribs
  id: string
  type: string
}

export type MetaAttribs = {
  content?: string
  href?: string
  name?: string
  property?: string
  rel?: string
}

export type GetPresignType = {
  url: string
}

export type UserType = {
  email?: string
  exp?: number
  iat?: number
  nameid?: string
  nbf?: string
  role?: string
  unique_name?: string
}

export type SigninResultType = {
  token: string | null
}

export type UserSigninType = {
  usernameoremail: string
  password: string
  role?: string
}
export type UserSignupType = {
  email: string
  password: string
  role?: string
}

export type SignupResultType = {
  token: string | null
}

export interface AWSTranscribeOutput {
  jobName: string
  accountId: string
  results: {
    transcripts: {
      transcript: string
    }[]
    items: TranscriptItem[]
    speaker_labels?: {
      speakers: number
      segments: SpeakerSegment[]
    }
  }
  status: string
}

export interface TranscriptItem {
  channel_label?: string
  start_time?: string
  end_time?: string
  type: "pronunciation" | "punctuation"
  alternatives: {
    confidence?: string
    content: string
  }[]
  speaker?: string
}

export interface SpeakerSegment {
  start_time: string
  end_time: string
  speaker_label: string
  items: SpeakerItem[]
}

export interface SpeakerItem {
  start_time: string
  end_time: string
  speaker_label: string
  type: "pronunciation" | "punctuation"
}

export type FormData = {
  Title: string
  Fields?: FormFieldTypeOld[]
}

export type FormFieldTypeOld = {
  name: string
  type:
    | "number"
    | "text"
    | "select"
    | "email"
    | "date"
    | "select"
    | "switch"
    | "textarea"
    | "tel"
    | "textfield"
    | "checkbox"
    | "address"
  label: string
  placeholder: string
  required: boolean
  value?: any
  options?: { value: string; label: string }[]
  condition?: FieldCondition
  nestedFields?: FormFieldTypeOld[]
  validation?: {
    required?: string
    minLength?: { value: number; message: string }
    maxLength?: { value: number; message: string }
    pattern?: { value: RegExp; message: string }
  }
}

export type FieldCondition = {
  FieldName: string
  ExpectedValue?: string
  Operator: string
}

export type Form = {
  changed?: string
  confirmation: FormConfirmation
  css?: string
  elements: Array<FormElement>
  entity: string
  id: string
  js?: string
  language?: string
  meta?: Array<MetaElement>
  open: boolean
  published?: boolean
  statusText: string
  theme?: string
  title: string
  url: string
  uuid: string
}

export type FormFieldType = {
  id: string
  type:
    | "number"
    | "text"
    | "select"
    | "email"
    | "date"
    | "select"
    | "switch"
    | "textarea"
    | "tel"
    | "textfield"
    | "checkbox"
    | "address"
  title?: string | null
  value?: Array<string> | null
  valueFormat?: string | null
  description?: string | null
  maxValues?: number | null
  maxSize?: number | null
  isRequired?: boolean | null
  prefix?: string | null
  suffix?: string | null
  clearOnHide?: boolean | null
  css?: string | null
  options?: Array<FormOption> | null
  errorMsgs?: Array<FormErrorMsg> | null
  stateMods?: Array<FormStateMod> | null
  extras?: FormExtrasFile | FormExtrasNumber | null
}

export type FormErrorMsg = {
  message?: string
  type: string
}

export type FormElement = {
  clearOnHide?: boolean
  css?: string
  description?: string
  elements?: Array<FormElement>
  placeholder: string
  errors?: Array<FormErrorMsg>
  extras?: FormExtras
  id: string
  isRequired?: boolean
  maxSize?: number
  maxValues?: number
  options?: Array<FormOption>
  prefix?: string
  stateMods?: Array<FormStateMod>
  suffix?: string
  title?: string
  type: string
  value?: string[]
  valueFormat?: string
}

export type FormStateMod = {
  matches: Array<FormStateModMatch>
  op?: string
  state: string
}

export type FormStateModMatch = {
  elem: string
  op: string
  value?: string
}
export type FormExtras = FormExtrasFile | FormExtrasNumber

export type FormExtrasFile = {
  exts?: Array<string>
}

export type FormExtrasNumber = {
  max?: number
  min?: number
  step?: number
}

export type FormOption = {
  text: string
  value: string
}

export type FormSubmitError = {
  errors?: Array<FormError>
  message: string
}

export type FormSubmitRes = FormSubmitError | FormSubmitSuccess

export type FormSubmitSuccess = {
  confirmation?: string
  id: string
  redirect?: string
}

export type FormError = {
  error: string
  id: string
}

export type FormValueInput = {
  id: string
  value?: Array<string>
}

export type MutationFormSubmitArgs = {
  id: string
  values?: Array<FormValueInput>
}

export type FormConfirmation = {
  text?: string
  title?: string
}

export interface LinkType {
  label: string
  path: string
  icon?: string
  children?: LinkType[]
}

export interface MediaType {
  alt: string
  src: string
  caption?: string
}

export interface CardType {
  img: MediaType
  header: any
  subheader: any
}

type Price = {
  value: number
  currency: string
  validFrom: string | null
  validThrough: string | null
  valueAddedTaxIncluded: boolean | null
  pricedProductId: string
  pricedProduct: any
  id: string
  createdAt: string
  updatedAt: string
}

type Product = Thing & {
  asin?: string | null
  countryOfAssembly?: string | null
  countryOfLastProcessing?: string | null
  adultOriented?: AdultOrientedEnum | null
  hasAdultConsideration?: boolean | null
  mobileUrl?: string | null
  negativeNotes?: string | null
  positiveNotes?: string | null
  pattern?: string | null
  brand?: string | null
  keywords?: string[] | null
  gtinValue?: string | null
  slogan?: string | null
  sku?: string | null
  logo?: string | null
  creatorId: string
  creator?: User | null
  price?: Price | null
  productCategories?: ProductCategory[] | null
  categories?: Category[] | null
  productRatings?: ProductRating[] | null
  productionDate: string
}

type Thing = {
  name?: string | null
  description?: string | null
  additionalType?: string | null
  altName?: string | null
  disambiguatingDescription?: string | null
  identifier?: string | null
  potentialAction?: string | null
  subjectOf?: string | null
  image?: string | null
  mainEntityOfPage?: string | null
  url?: string | null
}
