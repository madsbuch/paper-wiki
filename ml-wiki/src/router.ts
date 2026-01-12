// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/papers`
  | `/papers/attention-is-all-you-need`
  | `/papers/bert`
  | `/papers/chain-of-thought-prompting`
  | `/papers/gpt3-few-shot-learners`
  | `/papers/instructgpt`
  | `/test`
  | `/wiki`
  | `/wiki/ai-alignment`
  | `/wiki/arithmetic-reasoning`
  | `/wiki/autoregressive-language-model`
  | `/wiki/bidirectional-pretraining`
  | `/wiki/chain-of-thought-prompting`
  | `/wiki/emergent-abilities`
  | `/wiki/encoder-decoder`
  | `/wiki/few-shot-learning`
  | `/wiki/few-shot-prompting`
  | `/wiki/fine-tuning`
  | `/wiki/in-context-learning`
  | `/wiki/instruction-following`
  | `/wiki/masked-language-model`
  | `/wiki/meta-learning`
  | `/wiki/multi-head-attention`
  | `/wiki/next-sentence-prediction`
  | `/wiki/positional-encoding`
  | `/wiki/ppo`
  | `/wiki/reasoning-steps`
  | `/wiki/reward-modeling`
  | `/wiki/rlhf`
  | `/wiki/scaled-dot-product-attention`
  | `/wiki/self-attention`
  | `/wiki/transfer-learning`
  | `/wiki/transformer`
  | `/wiki/transformer-architecture`
  | `/wiki/zero-shot-learning`

export type Params = {
  
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
