import { IArticleBaseFormValues, IArticleFormValues, IArticleLanguageFormValues, TArticleLanguage } from "./types";

export const mapValues = (
  baseValues: IArticleBaseFormValues,
  values: IArticleLanguageFormValues,
  language: TArticleLanguage
): IArticleFormValues => {
  return {
    ...values,
    language,
    active: baseValues.active,
    pending: baseValues.pending,
    slug: baseValues.slug,
    publishedOn: baseValues.publishedOn
  }
};