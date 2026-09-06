/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddressesCityFilters = {
  OR?: InputMaybe<Array<AddressesCityfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesCityfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesCreatedAtFilters = {
  OR?: InputMaybe<Array<AddressesCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesFilters = {
  OR?: InputMaybe<Array<AddressesFiltersOr>>;
  city?: InputMaybe<AddressesCityFilters>;
  createdAt?: InputMaybe<AddressesCreatedAtFilters>;
  id?: InputMaybe<AddressesIdFilters>;
  isDefault?: InputMaybe<AddressesIsDefaultFilters>;
  label?: InputMaybe<AddressesLabelFilters>;
  lat?: InputMaybe<AddressesLatFilters>;
  line1?: InputMaybe<AddressesLine1Filters>;
  line2?: InputMaybe<AddressesLine2Filters>;
  lng?: InputMaybe<AddressesLngFilters>;
  phone?: InputMaybe<AddressesPhoneFilters>;
  pincode?: InputMaybe<AddressesPincodeFilters>;
  updatedAt?: InputMaybe<AddressesUpdatedAtFilters>;
  userId?: InputMaybe<AddressesUserIdFilters>;
};

export type AddressesFiltersOr = {
  city?: InputMaybe<AddressesCityFilters>;
  createdAt?: InputMaybe<AddressesCreatedAtFilters>;
  id?: InputMaybe<AddressesIdFilters>;
  isDefault?: InputMaybe<AddressesIsDefaultFilters>;
  label?: InputMaybe<AddressesLabelFilters>;
  lat?: InputMaybe<AddressesLatFilters>;
  line1?: InputMaybe<AddressesLine1Filters>;
  line2?: InputMaybe<AddressesLine2Filters>;
  lng?: InputMaybe<AddressesLngFilters>;
  phone?: InputMaybe<AddressesPhoneFilters>;
  pincode?: InputMaybe<AddressesPincodeFilters>;
  updatedAt?: InputMaybe<AddressesUpdatedAtFilters>;
  userId?: InputMaybe<AddressesUserIdFilters>;
};

export type AddressesIdFilters = {
  OR?: InputMaybe<Array<AddressesIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesInsertInput = {
  city: Scalars['String']['input'];
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
  lng: Scalars['Float']['input'];
  phone: Scalars['String']['input'];
  pincode: Scalars['String']['input'];
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type AddressesIsDefaultFilters = {
  OR?: InputMaybe<Array<AddressesIsDefaultfiltersOr>>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesIsDefaultfiltersOr = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesItem = {
  __typename?: 'AddressesItem';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AddressesLabelFilters = {
  OR?: InputMaybe<Array<AddressesLabelfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLabelfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLatFilters = {
  OR?: InputMaybe<Array<AddressesLatfiltersOr>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLatfiltersOr = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLine1Filters = {
  OR?: InputMaybe<Array<AddressesLine1filtersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLine1filtersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLine2Filters = {
  OR?: InputMaybe<Array<AddressesLine2filtersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLine2filtersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLngFilters = {
  OR?: InputMaybe<Array<AddressesLngfiltersOr>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesLngfiltersOr = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesOrderBy = {
  city?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  isDefault?: InputMaybe<InnerOrder>;
  label?: InputMaybe<InnerOrder>;
  lat?: InputMaybe<InnerOrder>;
  line1?: InputMaybe<InnerOrder>;
  line2?: InputMaybe<InnerOrder>;
  lng?: InputMaybe<InnerOrder>;
  phone?: InputMaybe<InnerOrder>;
  pincode?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
  userId?: InputMaybe<InnerOrder>;
};

export type AddressesPhoneFilters = {
  OR?: InputMaybe<Array<AddressesPhonefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesPhonefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesPincodeFilters = {
  OR?: InputMaybe<Array<AddressesPincodefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesPincodefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesSelectItem = {
  __typename?: 'AddressesSelectItem';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<AddressesUserRelation>;
  userId: Scalars['String']['output'];
};


export type AddressesSelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type AddressesUpdateInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesUpdatedAtFilters = {
  OR?: InputMaybe<Array<AddressesUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesUserIdFilters = {
  OR?: InputMaybe<Array<AddressesUserIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesUserIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesUserRelation = {
  __typename?: 'AddressesUserRelation';
  addresses: Array<AddressesUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<AddressesUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type AddressesUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type AddressesUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type AddressesUserRelationAddressesRelation = {
  __typename?: 'AddressesUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AddressesUserRelationSessionsRelation = {
  __typename?: 'AddressesUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<AddressesUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type AddressesUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type AddressesUserRelationSessionsRelationUserRelation = {
  __typename?: 'AddressesUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type AdminCategory = {
  __typename?: 'AdminCategory';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};

export type AdminCategoryInput = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type AdminCredentialsCreatedAtFilters = {
  OR?: InputMaybe<Array<AdminCredentialsCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsEmailFilters = {
  OR?: InputMaybe<Array<AdminCredentialsEmailfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsEmailfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsFilters = {
  OR?: InputMaybe<Array<AdminCredentialsFiltersOr>>;
  createdAt?: InputMaybe<AdminCredentialsCreatedAtFilters>;
  email?: InputMaybe<AdminCredentialsEmailFilters>;
  id?: InputMaybe<AdminCredentialsIdFilters>;
  passwordHash?: InputMaybe<AdminCredentialsPasswordHashFilters>;
  updatedAt?: InputMaybe<AdminCredentialsUpdatedAtFilters>;
  userId?: InputMaybe<AdminCredentialsUserIdFilters>;
};

export type AdminCredentialsFiltersOr = {
  createdAt?: InputMaybe<AdminCredentialsCreatedAtFilters>;
  email?: InputMaybe<AdminCredentialsEmailFilters>;
  id?: InputMaybe<AdminCredentialsIdFilters>;
  passwordHash?: InputMaybe<AdminCredentialsPasswordHashFilters>;
  updatedAt?: InputMaybe<AdminCredentialsUpdatedAtFilters>;
  userId?: InputMaybe<AdminCredentialsUserIdFilters>;
};

export type AdminCredentialsIdFilters = {
  OR?: InputMaybe<Array<AdminCredentialsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsInsertInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  passwordHash: Scalars['String']['input'];
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type AdminCredentialsItem = {
  __typename?: 'AdminCredentialsItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AdminCredentialsOrderBy = {
  createdAt?: InputMaybe<InnerOrder>;
  email?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  passwordHash?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
  userId?: InputMaybe<InnerOrder>;
};

export type AdminCredentialsPasswordHashFilters = {
  OR?: InputMaybe<Array<AdminCredentialsPasswordHashfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsPasswordHashfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsSelectItem = {
  __typename?: 'AdminCredentialsSelectItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<AdminCredentialsUserRelation>;
  userId: Scalars['String']['output'];
};


export type AdminCredentialsSelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type AdminCredentialsUpdateInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsUpdatedAtFilters = {
  OR?: InputMaybe<Array<AdminCredentialsUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsUserIdFilters = {
  OR?: InputMaybe<Array<AdminCredentialsUserIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsUserIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCredentialsUserRelation = {
  __typename?: 'AdminCredentialsUserRelation';
  addresses: Array<AdminCredentialsUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<AdminCredentialsUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type AdminCredentialsUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type AdminCredentialsUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type AdminCredentialsUserRelationAddressesRelation = {
  __typename?: 'AdminCredentialsUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<AdminCredentialsUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type AdminCredentialsUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type AdminCredentialsUserRelationAddressesRelationUserRelation = {
  __typename?: 'AdminCredentialsUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type AdminCredentialsUserRelationSessionsRelation = {
  __typename?: 'AdminCredentialsUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<AdminCredentialsUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type AdminCredentialsUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type AdminCredentialsUserRelationSessionsRelationUserRelation = {
  __typename?: 'AdminCredentialsUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type AdminCustomersPage = {
  __typename?: 'AdminCustomersPage';
  items: Array<AdminUser>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AdminDashboard = {
  __typename?: 'AdminDashboard';
  lowStockItems: Scalars['Int']['output'];
  placedOrders: Scalars['Int']['output'];
  processingOrders: Scalars['Int']['output'];
  todaysOrders: Scalars['Int']['output'];
};

export type AdminInventoryItem = {
  __typename?: 'AdminInventoryItem';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product: AdminProduct;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<AdminStore>;
  storeId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AdminInventoryPage = {
  __typename?: 'AdminInventoryPage';
  items: Array<AdminInventoryItem>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AdminOrder = {
  __typename?: 'AdminOrder';
  address: AdminOrderAddress;
  allowedNextStatuses: Array<AdminOrderStatus>;
  customer: AdminUser;
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  history: Array<AdminOrderStatusHistory>;
  id: Scalars['String']['output'];
  items: Array<AdminOrderItem>;
  paymentMethod: Scalars['String']['output'];
  placedAt: Scalars['String']['output'];
  status: AdminOrderStatus;
  store: AdminStore;
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AdminOrderAddress = {
  __typename?: 'AdminOrderAddress';
  city: Scalars['String']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
};

export type AdminOrderItem = {
  __typename?: 'AdminOrderItem';
  id: Scalars['String']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitPrice: Scalars['Int']['output'];
};

export type AdminOrderStatus =
  | 'CANCELLED'
  | 'DELIVERED'
  | 'OUT_FOR_DELIVERY'
  | 'PACKED'
  | 'PLACED';

export type AdminOrderStatusHistory = {
  __typename?: 'AdminOrderStatusHistory';
  changedBy?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  fromStatus?: Maybe<AdminOrderStatus>;
  id: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  toStatus: AdminOrderStatus;
};

export type AdminOrdersPage = {
  __typename?: 'AdminOrdersPage';
  items: Array<AdminOrder>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AdminProduct = {
  __typename?: 'AdminProduct';
  category: AdminCategory;
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<AdminInventoryItem>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<MarkupType>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<AdminStore>;
  storeId?: Maybe<Scalars['String']['output']>;
  timeBoundSections: Array<TimeBoundSectionId>;
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AdminProductInput = {
  categoryId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  initialStock?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  markup?: InputMaybe<Scalars['Int']['input']>;
  markupType?: InputMaybe<MarkupType>;
  mrp: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['String']['input']>;
  timeBoundSections?: InputMaybe<Array<TimeBoundSectionId>>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  unit: Scalars['String']['input'];
};

export type AdminProductsPage = {
  __typename?: 'AdminProductsPage';
  items: Array<AdminProduct>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AdminSession = {
  __typename?: 'AdminSession';
  expiresAt?: Maybe<Scalars['String']['output']>;
  user: AdminUser;
};

export type AdminSetupStatus = {
  __typename?: 'AdminSetupStatus';
  isRequired: Scalars['Boolean']['output'];
};

export type AdminStore = {
  __typename?: 'AdminStore';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: AdminStoreType;
  updatedAt: Scalars['String']['output'];
};

export type AdminStoreInput = {
  address: Scalars['String']['input'];
  commissionPct?: InputMaybe<Scalars['Int']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  partnerName?: InputMaybe<Scalars['String']['input']>;
  serviceRadiusM?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<AdminStoreType>;
};

export type AdminStoreType =
  | 'DARK_STORE'
  | 'THIRD_PARTY';

export type AdminUser = {
  __typename?: 'AdminUser';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AppAddress = {
  __typename?: 'AppAddress';
  city: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
};

export type AppAuthPayload = {
  __typename?: 'AppAuthPayload';
  token: Scalars['String']['output'];
  user: AppUser;
};

export type AppCart = {
  __typename?: 'AppCart';
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  items: Array<AppCartItem>;
  savings: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AppCartItem = {
  __typename?: 'AppCartItem';
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lineSavings: Scalars['Int']['output'];
  lineTotal: Scalars['Int']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  stockQty: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
};

export type AppDeliverySlot = {
  __typename?: 'AppDeliverySlot';
  capacity: Scalars['Int']['output'];
  endAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  remaining: Scalars['Int']['output'];
  startAt: Scalars['String']['output'];
};

export type AppDeliverySlots = {
  __typename?: 'AppDeliverySlots';
  slots: Array<AppDeliverySlot>;
  storeId: Scalars['String']['output'];
};

export type AppOrder = {
  __typename?: 'AppOrder';
  addressId: Scalars['String']['output'];
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  items: Array<AppOrderItem>;
  paymentMethod: Scalars['String']['output'];
  placedAt: Scalars['String']['output'];
  status: Scalars['String']['output'];
  storeId: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type AppOrderItem = {
  __typename?: 'AppOrderItem';
  id: Scalars['String']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitPrice: Scalars['Int']['output'];
};

export type AppOrdersPage = {
  __typename?: 'AppOrdersPage';
  items: Array<AppOrder>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AppRequestOtpPayload = {
  __typename?: 'AppRequestOtpPayload';
  message: Scalars['String']['output'];
};

export type AppServiceability = {
  __typename?: 'AppServiceability';
  distanceM?: Maybe<Scalars['Int']['output']>;
  etaMinutes?: Maybe<Scalars['Int']['output']>;
  serviceable: Scalars['Boolean']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  storeName?: Maybe<Scalars['String']['output']>;
};

export type AppUser = {
  __typename?: 'AppUser';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type CartItemsCartIdFilters = {
  OR?: InputMaybe<Array<CartItemsCartIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsCartIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsCartRelation = {
  __typename?: 'CartItemsCartRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  items: Array<CartItemsCartRelationItemsRelation>;
  store?: Maybe<CartItemsCartRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<CartItemsCartRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type CartItemsCartRelationItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CartItemsOrderBy>;
  where?: InputMaybe<CartItemsFilters>;
};


export type CartItemsCartRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};


export type CartItemsCartRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type CartItemsCartRelationItemsRelation = {
  __typename?: 'CartItemsCartRelationItemsRelation';
  cartId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelation = {
  __typename?: 'CartItemsCartRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CartItemsCartRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CartItemsCartRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsCartRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartItemsCartRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartItemsCartRelationStoreRelationInventoryRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartItemsCartRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartItemsCartRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsCartRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartItemsCartRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartItemsCartRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationInventoryRelationProductRelation';
  category?: Maybe<CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<CartItemsCartRelationStoreRelationInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<CartItemsCartRelationStoreRelationInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelationInventoryRelationProductRelationStoreRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelationProductsRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationProductsRelation';
  category?: Maybe<CartItemsCartRelationStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<CartItemsCartRelationStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<CartItemsCartRelationStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsCartRelationStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type CartItemsCartRelationStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartItemsCartRelationStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartItemsCartRelationStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<CartItemsCartRelationStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type CartItemsCartRelationStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartItemsCartRelationStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartItemsCartRelationStoreRelationProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartItemsCartRelationStoreRelationProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsCartRelationStoreRelationProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartItemsCartRelationStoreRelationProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartItemsCartRelationStoreRelationProductsRelationInventoryRelationProductRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelationProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationStoreRelationProductsRelationStoreRelation = {
  __typename?: 'CartItemsCartRelationStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationUserRelation = {
  __typename?: 'CartItemsCartRelationUserRelation';
  addresses: Array<CartItemsCartRelationUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<CartItemsCartRelationUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsCartRelationUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type CartItemsCartRelationUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type CartItemsCartRelationUserRelationAddressesRelation = {
  __typename?: 'CartItemsCartRelationUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<CartItemsCartRelationUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type CartItemsCartRelationUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type CartItemsCartRelationUserRelationAddressesRelationUserRelation = {
  __typename?: 'CartItemsCartRelationUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCartRelationUserRelationSessionsRelation = {
  __typename?: 'CartItemsCartRelationUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<CartItemsCartRelationUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type CartItemsCartRelationUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type CartItemsCartRelationUserRelationSessionsRelationUserRelation = {
  __typename?: 'CartItemsCartRelationUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsCreatedAtFilters = {
  OR?: InputMaybe<Array<CartItemsCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsFilters = {
  OR?: InputMaybe<Array<CartItemsFiltersOr>>;
  cartId?: InputMaybe<CartItemsCartIdFilters>;
  createdAt?: InputMaybe<CartItemsCreatedAtFilters>;
  id?: InputMaybe<CartItemsIdFilters>;
  productId?: InputMaybe<CartItemsProductIdFilters>;
  quantity?: InputMaybe<CartItemsQuantityFilters>;
  updatedAt?: InputMaybe<CartItemsUpdatedAtFilters>;
};

export type CartItemsFiltersOr = {
  cartId?: InputMaybe<CartItemsCartIdFilters>;
  createdAt?: InputMaybe<CartItemsCreatedAtFilters>;
  id?: InputMaybe<CartItemsIdFilters>;
  productId?: InputMaybe<CartItemsProductIdFilters>;
  quantity?: InputMaybe<CartItemsQuantityFilters>;
  updatedAt?: InputMaybe<CartItemsUpdatedAtFilters>;
};

export type CartItemsIdFilters = {
  OR?: InputMaybe<Array<CartItemsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsInsertInput = {
  cartId: Scalars['String']['input'];
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsItem = {
  __typename?: 'CartItemsItem';
  cartId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsOrderBy = {
  cartId?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  productId?: InputMaybe<InnerOrder>;
  quantity?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
};

export type CartItemsProductIdFilters = {
  OR?: InputMaybe<Array<CartItemsProductIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsProductIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsProductRelation = {
  __typename?: 'CartItemsProductRelation';
  category?: Maybe<CartItemsProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<CartItemsProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<CartItemsProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type CartItemsProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartItemsProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartItemsProductRelationCategoryRelation = {
  __typename?: 'CartItemsProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<CartItemsProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type CartItemsProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartItemsProductRelationCategoryRelationProductsRelation = {
  __typename?: 'CartItemsProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsProductRelationInventoryRelation = {
  __typename?: 'CartItemsProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartItemsProductRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartItemsProductRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsProductRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartItemsProductRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartItemsProductRelationInventoryRelationProductRelation = {
  __typename?: 'CartItemsProductRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsProductRelationInventoryRelationStoreRelation = {
  __typename?: 'CartItemsProductRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CartItemsProductRelationInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CartItemsProductRelationInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsProductRelationInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartItemsProductRelationInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartItemsProductRelationInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'CartItemsProductRelationInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsProductRelationInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'CartItemsProductRelationInventoryRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsProductRelationStoreRelation = {
  __typename?: 'CartItemsProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CartItemsProductRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CartItemsProductRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsProductRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartItemsProductRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartItemsProductRelationStoreRelationInventoryRelation = {
  __typename?: 'CartItemsProductRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartItemsProductRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartItemsProductRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsProductRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartItemsProductRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartItemsProductRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'CartItemsProductRelationStoreRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsProductRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'CartItemsProductRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsProductRelationStoreRelationProductsRelation = {
  __typename?: 'CartItemsProductRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartItemsQuantityFilters = {
  OR?: InputMaybe<Array<CartItemsQuantityfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsQuantityfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsSelectItem = {
  __typename?: 'CartItemsSelectItem';
  cart?: Maybe<CartItemsCartRelation>;
  cartId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  product?: Maybe<CartItemsProductRelation>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartItemsSelectItemCartArgs = {
  where?: InputMaybe<CartsFilters>;
};


export type CartItemsSelectItemProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};

export type CartItemsUpdateInput = {
  cartId?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsUpdatedAtFilters = {
  OR?: InputMaybe<Array<CartItemsUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemsUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsCreatedAtFilters = {
  OR?: InputMaybe<Array<CartsCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsFilters = {
  OR?: InputMaybe<Array<CartsFiltersOr>>;
  createdAt?: InputMaybe<CartsCreatedAtFilters>;
  id?: InputMaybe<CartsIdFilters>;
  storeId?: InputMaybe<CartsStoreIdFilters>;
  updatedAt?: InputMaybe<CartsUpdatedAtFilters>;
  userId?: InputMaybe<CartsUserIdFilters>;
};

export type CartsFiltersOr = {
  createdAt?: InputMaybe<CartsCreatedAtFilters>;
  id?: InputMaybe<CartsIdFilters>;
  storeId?: InputMaybe<CartsStoreIdFilters>;
  updatedAt?: InputMaybe<CartsUpdatedAtFilters>;
  userId?: InputMaybe<CartsUserIdFilters>;
};

export type CartsIdFilters = {
  OR?: InputMaybe<Array<CartsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsInsertInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['String']['input'];
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CartsItem = {
  __typename?: 'CartsItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CartsItemsRelation = {
  __typename?: 'CartsItemsRelation';
  cart?: Maybe<CartsItemsRelationCartRelation>;
  cartId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  product?: Maybe<CartsItemsRelationProductRelation>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsItemsRelationCartArgs = {
  where?: InputMaybe<CartsFilters>;
};


export type CartsItemsRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};

export type CartsItemsRelationCartRelation = {
  __typename?: 'CartsItemsRelationCartRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CartsItemsRelationProductRelation = {
  __typename?: 'CartsItemsRelationProductRelation';
  category?: Maybe<CartsItemsRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<CartsItemsRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<CartsItemsRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsItemsRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type CartsItemsRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartsItemsRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartsItemsRelationProductRelationCategoryRelation = {
  __typename?: 'CartsItemsRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<CartsItemsRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type CartsItemsRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartsItemsRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'CartsItemsRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsItemsRelationProductRelationInventoryRelation = {
  __typename?: 'CartsItemsRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartsItemsRelationProductRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartsItemsRelationProductRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsItemsRelationProductRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartsItemsRelationProductRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartsItemsRelationProductRelationInventoryRelationProductRelation = {
  __typename?: 'CartsItemsRelationProductRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsItemsRelationProductRelationInventoryRelationStoreRelation = {
  __typename?: 'CartsItemsRelationProductRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CartsItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CartsItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsItemsRelationProductRelationInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartsItemsRelationProductRelationInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartsItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'CartsItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'CartsItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsItemsRelationProductRelationStoreRelation = {
  __typename?: 'CartsItemsRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CartsItemsRelationProductRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CartsItemsRelationProductRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsItemsRelationProductRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartsItemsRelationProductRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartsItemsRelationProductRelationStoreRelationInventoryRelation = {
  __typename?: 'CartsItemsRelationProductRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartsItemsRelationProductRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartsItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsItemsRelationProductRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartsItemsRelationProductRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartsItemsRelationProductRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'CartsItemsRelationProductRelationStoreRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'CartsItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsItemsRelationProductRelationStoreRelationProductsRelation = {
  __typename?: 'CartsItemsRelationProductRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsOrderBy = {
  createdAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  storeId?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
  userId?: InputMaybe<InnerOrder>;
};

export type CartsSelectItem = {
  __typename?: 'CartsSelectItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  items: Array<CartsItemsRelation>;
  store?: Maybe<CartsStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<CartsUserRelation>;
  userId: Scalars['String']['output'];
};


export type CartsSelectItemItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CartItemsOrderBy>;
  where?: InputMaybe<CartItemsFilters>;
};


export type CartsSelectItemStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};


export type CartsSelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type CartsStoreIdFilters = {
  OR?: InputMaybe<Array<CartsStoreIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsStoreIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsStoreRelation = {
  __typename?: 'CartsStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CartsStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CartsStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartsStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartsStoreRelationInventoryRelation = {
  __typename?: 'CartsStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartsStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartsStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartsStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartsStoreRelationInventoryRelationProductRelation = {
  __typename?: 'CartsStoreRelationInventoryRelationProductRelation';
  category?: Maybe<CartsStoreRelationInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<CartsStoreRelationInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<CartsStoreRelationInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsStoreRelationInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type CartsStoreRelationInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartsStoreRelationInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartsStoreRelationInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'CartsStoreRelationInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<CartsStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type CartsStoreRelationInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartsStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'CartsStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsStoreRelationInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'CartsStoreRelationInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsStoreRelationInventoryRelationProductRelationStoreRelation = {
  __typename?: 'CartsStoreRelationInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'CartsStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsStoreRelationProductsRelation = {
  __typename?: 'CartsStoreRelationProductsRelation';
  category?: Maybe<CartsStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<CartsStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<CartsStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type CartsStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CartsStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartsStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'CartsStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<CartsStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type CartsStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CartsStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'CartsStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'CartsStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CartsStoreRelationProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CartsStoreRelationProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsStoreRelationProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CartsStoreRelationProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CartsStoreRelationProductsRelationInventoryRelationProductRelation = {
  __typename?: 'CartsStoreRelationProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsStoreRelationProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'CartsStoreRelationProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsStoreRelationProductsRelationStoreRelation = {
  __typename?: 'CartsStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsUpdateInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CartsUpdatedAtFilters = {
  OR?: InputMaybe<Array<CartsUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsUserIdFilters = {
  OR?: InputMaybe<Array<CartsUserIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsUserIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CartsUserRelation = {
  __typename?: 'CartsUserRelation';
  addresses: Array<CartsUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<CartsUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CartsUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type CartsUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type CartsUserRelationAddressesRelation = {
  __typename?: 'CartsUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<CartsUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type CartsUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type CartsUserRelationAddressesRelationUserRelation = {
  __typename?: 'CartsUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CartsUserRelationSessionsRelation = {
  __typename?: 'CartsUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<CartsUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type CartsUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type CartsUserRelationSessionsRelationUserRelation = {
  __typename?: 'CartsUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CategoriesCreatedAtFilters = {
  OR?: InputMaybe<Array<CategoriesCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesFilters = {
  OR?: InputMaybe<Array<CategoriesFiltersOr>>;
  createdAt?: InputMaybe<CategoriesCreatedAtFilters>;
  id?: InputMaybe<CategoriesIdFilters>;
  name?: InputMaybe<CategoriesNameFilters>;
  slug?: InputMaybe<CategoriesSlugFilters>;
  sortOrder?: InputMaybe<CategoriesSortOrderFilters>;
};

export type CategoriesFiltersOr = {
  createdAt?: InputMaybe<CategoriesCreatedAtFilters>;
  id?: InputMaybe<CategoriesIdFilters>;
  name?: InputMaybe<CategoriesNameFilters>;
  slug?: InputMaybe<CategoriesSlugFilters>;
  sortOrder?: InputMaybe<CategoriesSortOrderFilters>;
};

export type CategoriesIdFilters = {
  OR?: InputMaybe<Array<CategoriesIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesInsertInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type CategoriesItem = {
  __typename?: 'CategoriesItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};

export type CategoriesNameFilters = {
  OR?: InputMaybe<Array<CategoriesNamefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesNamefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesOrderBy = {
  createdAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  name?: InputMaybe<InnerOrder>;
  slug?: InputMaybe<InnerOrder>;
  sortOrder?: InputMaybe<InnerOrder>;
};

export type CategoriesProductsRelation = {
  __typename?: 'CategoriesProductsRelation';
  category?: Maybe<CategoriesProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<CategoriesProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<CategoriesProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CategoriesProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type CategoriesProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CategoriesProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CategoriesProductsRelationCategoryRelation = {
  __typename?: 'CategoriesProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};

export type CategoriesProductsRelationInventoryRelation = {
  __typename?: 'CategoriesProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CategoriesProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CategoriesProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CategoriesProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CategoriesProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CategoriesProductsRelationInventoryRelationProductRelation = {
  __typename?: 'CategoriesProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CategoriesProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'CategoriesProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CategoriesProductsRelationInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CategoriesProductsRelationInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CategoriesProductsRelationInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CategoriesProductsRelationInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CategoriesProductsRelationInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'CategoriesProductsRelationInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CategoriesProductsRelationInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'CategoriesProductsRelationInventoryRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CategoriesProductsRelationStoreRelation = {
  __typename?: 'CategoriesProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<CategoriesProductsRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<CategoriesProductsRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CategoriesProductsRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type CategoriesProductsRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CategoriesProductsRelationStoreRelationInventoryRelation = {
  __typename?: 'CategoriesProductsRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<CategoriesProductsRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<CategoriesProductsRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type CategoriesProductsRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type CategoriesProductsRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type CategoriesProductsRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'CategoriesProductsRelationStoreRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CategoriesProductsRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'CategoriesProductsRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CategoriesProductsRelationStoreRelationProductsRelation = {
  __typename?: 'CategoriesProductsRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type CategoriesSelectItem = {
  __typename?: 'CategoriesSelectItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<CategoriesProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type CategoriesSelectItemProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type CategoriesSlugFilters = {
  OR?: InputMaybe<Array<CategoriesSlugfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesSlugfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesSortOrderFilters = {
  OR?: InputMaybe<Array<CategoriesSortOrderfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesSortOrderfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesUpdateInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type DeviceRegistrationsCreatedAtFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsFiltersOr>>;
  createdAt?: InputMaybe<DeviceRegistrationsCreatedAtFilters>;
  id?: InputMaybe<DeviceRegistrationsIdFilters>;
  kind?: InputMaybe<DeviceRegistrationsKindFilters>;
  platform?: InputMaybe<DeviceRegistrationsPlatformFilters>;
  target?: InputMaybe<DeviceRegistrationsTargetFilters>;
  updatedAt?: InputMaybe<DeviceRegistrationsUpdatedAtFilters>;
  userAgent?: InputMaybe<DeviceRegistrationsUserAgentFilters>;
  userId?: InputMaybe<DeviceRegistrationsUserIdFilters>;
};

export type DeviceRegistrationsFiltersOr = {
  createdAt?: InputMaybe<DeviceRegistrationsCreatedAtFilters>;
  id?: InputMaybe<DeviceRegistrationsIdFilters>;
  kind?: InputMaybe<DeviceRegistrationsKindFilters>;
  platform?: InputMaybe<DeviceRegistrationsPlatformFilters>;
  target?: InputMaybe<DeviceRegistrationsTargetFilters>;
  updatedAt?: InputMaybe<DeviceRegistrationsUpdatedAtFilters>;
  userAgent?: InputMaybe<DeviceRegistrationsUserAgentFilters>;
  userId?: InputMaybe<DeviceRegistrationsUserIdFilters>;
};

export type DeviceRegistrationsIdFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsInsertInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  kind: DeviceRegistrationsKindEnum;
  platform: DeviceRegistrationsPlatformEnum;
  target: Scalars['String']['input'];
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userAgent?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type DeviceRegistrationsItem = {
  __typename?: 'DeviceRegistrationsItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  kind: DeviceRegistrationsKindEnum;
  platform: DeviceRegistrationsPlatformEnum;
  target: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userAgent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type DeviceRegistrationsKindEnum =
  /** Value: FID */
  | 'FID'
  /** Value: TOKEN */
  | 'TOKEN';

export type DeviceRegistrationsKindFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsKindfiltersOr>>;
  eq?: InputMaybe<DeviceRegistrationsKindEnum>;
  gt?: InputMaybe<DeviceRegistrationsKindEnum>;
  gte?: InputMaybe<DeviceRegistrationsKindEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<DeviceRegistrationsKindEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<DeviceRegistrationsKindEnum>;
  lte?: InputMaybe<DeviceRegistrationsKindEnum>;
  ne?: InputMaybe<DeviceRegistrationsKindEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<DeviceRegistrationsKindEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsKindfiltersOr = {
  eq?: InputMaybe<DeviceRegistrationsKindEnum>;
  gt?: InputMaybe<DeviceRegistrationsKindEnum>;
  gte?: InputMaybe<DeviceRegistrationsKindEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<DeviceRegistrationsKindEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<DeviceRegistrationsKindEnum>;
  lte?: InputMaybe<DeviceRegistrationsKindEnum>;
  ne?: InputMaybe<DeviceRegistrationsKindEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<DeviceRegistrationsKindEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsOrderBy = {
  createdAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  kind?: InputMaybe<InnerOrder>;
  platform?: InputMaybe<InnerOrder>;
  target?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
  userAgent?: InputMaybe<InnerOrder>;
  userId?: InputMaybe<InnerOrder>;
};

export type DeviceRegistrationsPlatformEnum =
  /** Value: android */
  | 'android'
  /** Value: ios */
  | 'ios'
  /** Value: web */
  | 'web';

export type DeviceRegistrationsPlatformFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsPlatformfiltersOr>>;
  eq?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  gt?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  gte?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<DeviceRegistrationsPlatformEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  lte?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  ne?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<DeviceRegistrationsPlatformEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsPlatformfiltersOr = {
  eq?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  gt?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  gte?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<DeviceRegistrationsPlatformEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  lte?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  ne?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<DeviceRegistrationsPlatformEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsSelectItem = {
  __typename?: 'DeviceRegistrationsSelectItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  kind: DeviceRegistrationsKindEnum;
  platform: DeviceRegistrationsPlatformEnum;
  target: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<DeviceRegistrationsUserRelation>;
  userAgent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};


export type DeviceRegistrationsSelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type DeviceRegistrationsTargetFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsTargetfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsTargetfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUpdateInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<DeviceRegistrationsKindEnum>;
  platform?: InputMaybe<DeviceRegistrationsPlatformEnum>;
  target?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userAgent?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUpdatedAtFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUserAgentFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsUserAgentfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUserAgentfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUserIdFilters = {
  OR?: InputMaybe<Array<DeviceRegistrationsUserIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUserIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationsUserRelation = {
  __typename?: 'DeviceRegistrationsUserRelation';
  addresses: Array<DeviceRegistrationsUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<DeviceRegistrationsUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type DeviceRegistrationsUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type DeviceRegistrationsUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type DeviceRegistrationsUserRelationAddressesRelation = {
  __typename?: 'DeviceRegistrationsUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<DeviceRegistrationsUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type DeviceRegistrationsUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type DeviceRegistrationsUserRelationAddressesRelationUserRelation = {
  __typename?: 'DeviceRegistrationsUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type DeviceRegistrationsUserRelationSessionsRelation = {
  __typename?: 'DeviceRegistrationsUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<DeviceRegistrationsUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type DeviceRegistrationsUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type DeviceRegistrationsUserRelationSessionsRelationUserRelation = {
  __typename?: 'DeviceRegistrationsUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InnerOrder = {
  direction: OrderDirection;
  /** Priority of current field */
  priority: Scalars['Int']['input'];
};

export type InventoryAdjustmentsAdjustedByFilters = {
  OR?: InputMaybe<Array<InventoryAdjustmentsAdjustedByfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsAdjustedByfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsCreatedAtFilters = {
  OR?: InputMaybe<Array<InventoryAdjustmentsCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsDeltaFilters = {
  OR?: InputMaybe<Array<InventoryAdjustmentsDeltafiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsDeltafiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsFilters = {
  OR?: InputMaybe<Array<InventoryAdjustmentsFiltersOr>>;
  adjustedBy?: InputMaybe<InventoryAdjustmentsAdjustedByFilters>;
  createdAt?: InputMaybe<InventoryAdjustmentsCreatedAtFilters>;
  delta?: InputMaybe<InventoryAdjustmentsDeltaFilters>;
  id?: InputMaybe<InventoryAdjustmentsIdFilters>;
  inventoryId?: InputMaybe<InventoryAdjustmentsInventoryIdFilters>;
  reason?: InputMaybe<InventoryAdjustmentsReasonFilters>;
};

export type InventoryAdjustmentsFiltersOr = {
  adjustedBy?: InputMaybe<InventoryAdjustmentsAdjustedByFilters>;
  createdAt?: InputMaybe<InventoryAdjustmentsCreatedAtFilters>;
  delta?: InputMaybe<InventoryAdjustmentsDeltaFilters>;
  id?: InputMaybe<InventoryAdjustmentsIdFilters>;
  inventoryId?: InputMaybe<InventoryAdjustmentsInventoryIdFilters>;
  reason?: InputMaybe<InventoryAdjustmentsReasonFilters>;
};

export type InventoryAdjustmentsIdFilters = {
  OR?: InputMaybe<Array<InventoryAdjustmentsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsInsertInput = {
  adjustedBy: Scalars['String']['input'];
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  delta: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  inventoryId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type InventoryAdjustmentsInventoryIdFilters = {
  OR?: InputMaybe<Array<InventoryAdjustmentsInventoryIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsInventoryIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsInventoryRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<InventoryAdjustmentsInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<InventoryAdjustmentsInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryAdjustmentsInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type InventoryAdjustmentsInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type InventoryAdjustmentsInventoryRelationProductRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationProductRelation';
  category?: Maybe<InventoryAdjustmentsInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<InventoryAdjustmentsInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<InventoryAdjustmentsInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryAdjustmentsInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type InventoryAdjustmentsInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryAdjustmentsInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type InventoryAdjustmentsInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<InventoryAdjustmentsInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type InventoryAdjustmentsInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryAdjustmentsInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsInventoryRelationProductRelationStoreRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<InventoryAdjustmentsInventoryRelationProductRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<InventoryAdjustmentsInventoryRelationProductRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryAdjustmentsInventoryRelationProductRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryAdjustmentsInventoryRelationProductRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryAdjustmentsInventoryRelationProductRelationStoreRelationInventoryRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationProductRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsInventoryRelationProductRelationStoreRelationProductsRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationProductRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsInventoryRelationStoreRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<InventoryAdjustmentsInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<InventoryAdjustmentsInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryAdjustmentsInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryAdjustmentsInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryAdjustmentsInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationStoreRelationProductsRelation';
  category?: Maybe<InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationStoreRelation = {
  __typename?: 'InventoryAdjustmentsInventoryRelationStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsItem = {
  __typename?: 'InventoryAdjustmentsItem';
  adjustedBy: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  delta: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  inventoryId: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type InventoryAdjustmentsOrderBy = {
  adjustedBy?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  delta?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  inventoryId?: InputMaybe<InnerOrder>;
  reason?: InputMaybe<InnerOrder>;
};

export type InventoryAdjustmentsReasonFilters = {
  OR?: InputMaybe<Array<InventoryAdjustmentsReasonfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsReasonfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsSelectItem = {
  __typename?: 'InventoryAdjustmentsSelectItem';
  adjustedBy: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  delta: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  inventory?: Maybe<InventoryAdjustmentsInventoryRelation>;
  inventoryId: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  user?: Maybe<InventoryAdjustmentsUserRelation>;
};


export type InventoryAdjustmentsSelectItemInventoryArgs = {
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryAdjustmentsSelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type InventoryAdjustmentsUpdateInput = {
  adjustedBy?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  delta?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  inventoryId?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryAdjustmentsUserRelation = {
  __typename?: 'InventoryAdjustmentsUserRelation';
  addresses: Array<InventoryAdjustmentsUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<InventoryAdjustmentsUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryAdjustmentsUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type InventoryAdjustmentsUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type InventoryAdjustmentsUserRelationAddressesRelation = {
  __typename?: 'InventoryAdjustmentsUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<InventoryAdjustmentsUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type InventoryAdjustmentsUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type InventoryAdjustmentsUserRelationAddressesRelationUserRelation = {
  __typename?: 'InventoryAdjustmentsUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryAdjustmentsUserRelationSessionsRelation = {
  __typename?: 'InventoryAdjustmentsUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<InventoryAdjustmentsUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type InventoryAdjustmentsUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type InventoryAdjustmentsUserRelationSessionsRelationUserRelation = {
  __typename?: 'InventoryAdjustmentsUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryFilters = {
  OR?: InputMaybe<Array<InventoryFiltersOr>>;
  id?: InputMaybe<InventoryIdFilters>;
  lowStockThreshold?: InputMaybe<InventoryLowStockThresholdFilters>;
  productId?: InputMaybe<InventoryProductIdFilters>;
  stockQty?: InputMaybe<InventoryStockQtyFilters>;
  storeId?: InputMaybe<InventoryStoreIdFilters>;
  updatedAt?: InputMaybe<InventoryUpdatedAtFilters>;
};

export type InventoryFiltersOr = {
  id?: InputMaybe<InventoryIdFilters>;
  lowStockThreshold?: InputMaybe<InventoryLowStockThresholdFilters>;
  productId?: InputMaybe<InventoryProductIdFilters>;
  stockQty?: InputMaybe<InventoryStockQtyFilters>;
  storeId?: InputMaybe<InventoryStoreIdFilters>;
  updatedAt?: InputMaybe<InventoryUpdatedAtFilters>;
};

export type InventoryIdFilters = {
  OR?: InputMaybe<Array<InventoryIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryInsertInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  lowStockThreshold?: InputMaybe<Scalars['Int']['input']>;
  productId: Scalars['String']['input'];
  stockQty?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['String']['input'];
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryLowStockThresholdFilters = {
  OR?: InputMaybe<Array<InventoryLowStockThresholdfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryLowStockThresholdfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryOrderBy = {
  id?: InputMaybe<InnerOrder>;
  lowStockThreshold?: InputMaybe<InnerOrder>;
  productId?: InputMaybe<InnerOrder>;
  stockQty?: InputMaybe<InnerOrder>;
  storeId?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
};

export type InventoryProductIdFilters = {
  OR?: InputMaybe<Array<InventoryProductIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryProductIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryProductRelation = {
  __typename?: 'InventoryProductRelation';
  category?: Maybe<InventoryProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<InventoryProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<InventoryProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type InventoryProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type InventoryProductRelationCategoryRelation = {
  __typename?: 'InventoryProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<InventoryProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type InventoryProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryProductRelationCategoryRelationProductsRelation = {
  __typename?: 'InventoryProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryProductRelationInventoryRelation = {
  __typename?: 'InventoryProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryProductRelationStoreRelation = {
  __typename?: 'InventoryProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<InventoryProductRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<InventoryProductRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryProductRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryProductRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryProductRelationStoreRelationInventoryRelation = {
  __typename?: 'InventoryProductRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryProductRelationStoreRelationProductsRelation = {
  __typename?: 'InventoryProductRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventorySelectItem = {
  __typename?: 'InventorySelectItem';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<InventoryProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<InventoryStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventorySelectItemProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type InventorySelectItemStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type InventoryStockQtyFilters = {
  OR?: InputMaybe<Array<InventoryStockQtyfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryStockQtyfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryStoreIdFilters = {
  OR?: InputMaybe<Array<InventoryStoreIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryStoreIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryStoreRelation = {
  __typename?: 'InventoryStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<InventoryStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<InventoryStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryStoreRelationInventoryRelation = {
  __typename?: 'InventoryStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryStoreRelationProductsRelation = {
  __typename?: 'InventoryStoreRelationProductsRelation';
  category?: Maybe<InventoryStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<InventoryStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<InventoryStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type InventoryStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type InventoryStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type InventoryStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type InventoryStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'InventoryStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<InventoryStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type InventoryStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type InventoryStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'InventoryStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'InventoryStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryStoreRelationProductsRelationStoreRelation = {
  __typename?: 'InventoryStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type InventoryUpdateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  lowStockThreshold?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  stockQty?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryUpdatedAtFilters = {
  OR?: InputMaybe<Array<InventoryUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type InventoryUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type MarkupType =
  | 'AMOUNT'
  | 'PERCENTAGE';

export type Mutation = {
  __typename?: 'Mutation';
  addAddress: AppAddress;
  addToCart: AppCart;
  adjustAdminInventory: AdminInventoryItem;
  adminLogin: AdminSession;
  adminLogout: Scalars['Boolean']['output'];
  adminSetup: AdminSession;
  bulkCreateAdminCategories: Array<AdminCategory>;
  bulkCreateAdminProducts: Array<AdminProduct>;
  bulkCreateAdminStores: Array<AdminStore>;
  cancelOrder: AppOrder;
  checkout: AppOrder;
  createAdminCategory: AdminCategory;
  createAdminProduct: AdminProduct;
  createAdminStore: AdminStore;
  deleteAddress: Scalars['Boolean']['output'];
  registerAdminDevice: Scalars['Boolean']['output'];
  removeCartItem: AppCart;
  requestOtp: AppRequestOtpPayload;
  transitionAdminOrder: AdminOrder;
  unregisterAdminDevice: Scalars['Boolean']['output'];
  updateAddress: AppAddress;
  updateAdminCategory: AdminCategory;
  updateAdminCustomer: AdminUser;
  updateAdminProduct: AdminProduct;
  updateAdminStore: AdminStore;
  updateCartItem: AppCart;
  updateOrderStatus: AppOrder;
  updateProfile: AppUser;
  verifyOtp: AppAuthPayload;
};


export type MutationAddAddressArgs = {
  city: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
  lng: Scalars['Float']['input'];
  phone: Scalars['String']['input'];
  pincode: Scalars['String']['input'];
};


export type MutationAddToCartArgs = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAdjustAdminInventoryArgs = {
  delta: Scalars['Int']['input'];
  inventoryId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationAdminLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAdminSetupArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};


export type MutationBulkCreateAdminCategoriesArgs = {
  categories: Array<AdminCategoryInput>;
};


export type MutationBulkCreateAdminProductsArgs = {
  products: Array<AdminProductInput>;
};


export type MutationBulkCreateAdminStoresArgs = {
  stores: Array<AdminStoreInput>;
};


export type MutationCancelOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationCheckoutArgs = {
  addressId: Scalars['String']['input'];
  idempotencyKey: Scalars['String']['input'];
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateAdminCategoryArgs = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateAdminProductArgs = {
  categoryId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  initialStock?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  markup?: InputMaybe<Scalars['Int']['input']>;
  markupType?: InputMaybe<MarkupType>;
  mrp: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['String']['input']>;
  timeBoundSections?: InputMaybe<Array<TimeBoundSectionId>>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  unit: Scalars['String']['input'];
};


export type MutationCreateAdminStoreArgs = {
  address: Scalars['String']['input'];
  commissionPct?: InputMaybe<Scalars['Int']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  partnerName?: InputMaybe<Scalars['String']['input']>;
  serviceRadiusM?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<AdminStoreType>;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterAdminDeviceArgs = {
  fid: Scalars['String']['input'];
  userAgent?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveCartItemArgs = {
  itemId: Scalars['String']['input'];
};


export type MutationRequestOtpArgs = {
  phone: Scalars['String']['input'];
};


export type MutationTransitionAdminOrderArgs = {
  orderId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  status: AdminOrderStatus;
};


export type MutationUnregisterAdminDeviceArgs = {
  fid: Scalars['String']['input'];
};


export type MutationUpdateAddressArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  pincode?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAdminCategoryArgs = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateAdminCustomerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAdminProductArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  initialStock?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  markup?: InputMaybe<Scalars['Int']['input']>;
  markupType?: InputMaybe<MarkupType>;
  mrp?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  timeBoundSections?: InputMaybe<Array<TimeBoundSectionId>>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAdminStoreArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  commissionPct?: InputMaybe<Scalars['Int']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partnerName?: InputMaybe<Scalars['String']['input']>;
  serviceRadiusM?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<AdminStoreType>;
};


export type MutationUpdateCartItemArgs = {
  itemId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationUpdateOrderStatusArgs = {
  orderId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyOtpArgs = {
  code: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

/** Order by direction */
export type OrderDirection =
  /** Ascending order */
  | 'asc'
  /** Descending order */
  | 'desc';

export type OrderItemsFilters = {
  OR?: InputMaybe<Array<OrderItemsFiltersOr>>;
  id?: InputMaybe<OrderItemsIdFilters>;
  mrp?: InputMaybe<OrderItemsMrpFilters>;
  name?: InputMaybe<OrderItemsNameFilters>;
  orderId?: InputMaybe<OrderItemsOrderIdFilters>;
  productId?: InputMaybe<OrderItemsProductIdFilters>;
  quantity?: InputMaybe<OrderItemsQuantityFilters>;
  unit?: InputMaybe<OrderItemsUnitFilters>;
  unitPrice?: InputMaybe<OrderItemsUnitPriceFilters>;
};

export type OrderItemsFiltersOr = {
  id?: InputMaybe<OrderItemsIdFilters>;
  mrp?: InputMaybe<OrderItemsMrpFilters>;
  name?: InputMaybe<OrderItemsNameFilters>;
  orderId?: InputMaybe<OrderItemsOrderIdFilters>;
  productId?: InputMaybe<OrderItemsProductIdFilters>;
  quantity?: InputMaybe<OrderItemsQuantityFilters>;
  unit?: InputMaybe<OrderItemsUnitFilters>;
  unitPrice?: InputMaybe<OrderItemsUnitPriceFilters>;
};

export type OrderItemsIdFilters = {
  OR?: InputMaybe<Array<OrderItemsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsInsertInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  mrp: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  unit: Scalars['String']['input'];
  unitPrice: Scalars['Int']['input'];
};

export type OrderItemsItem = {
  __typename?: 'OrderItemsItem';
  id: Scalars['String']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitPrice: Scalars['Int']['output'];
};

export type OrderItemsMrpFilters = {
  OR?: InputMaybe<Array<OrderItemsMrpfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsMrpfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsNameFilters = {
  OR?: InputMaybe<Array<OrderItemsNamefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsNamefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsOrderBy = {
  id?: InputMaybe<InnerOrder>;
  mrp?: InputMaybe<InnerOrder>;
  name?: InputMaybe<InnerOrder>;
  orderId?: InputMaybe<InnerOrder>;
  productId?: InputMaybe<InnerOrder>;
  quantity?: InputMaybe<InnerOrder>;
  unit?: InputMaybe<InnerOrder>;
  unitPrice?: InputMaybe<InnerOrder>;
};

export type OrderItemsOrderIdFilters = {
  OR?: InputMaybe<Array<OrderItemsOrderIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsOrderIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsOrderRelation = {
  __typename?: 'OrderItemsOrderRelation';
  address?: Maybe<OrderItemsOrderRelationAddressRelation>;
  addressId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  items: Array<OrderItemsOrderRelationItemsRelation>;
  paymentMethod: Scalars['String']['output'];
  /** Date */
  placedAt: Scalars['String']['output'];
  status: OrdersStatusEnum;
  store?: Maybe<OrderItemsOrderRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrderItemsOrderRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderItemsOrderRelationAddressArgs = {
  where?: InputMaybe<AddressesFilters>;
};


export type OrderItemsOrderRelationItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrderItemsOrderBy>;
  where?: InputMaybe<OrderItemsFilters>;
};


export type OrderItemsOrderRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};


export type OrderItemsOrderRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderItemsOrderRelationAddressRelation = {
  __typename?: 'OrderItemsOrderRelationAddressRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrderItemsOrderRelationAddressRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderItemsOrderRelationAddressRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderItemsOrderRelationAddressRelationUserRelation = {
  __typename?: 'OrderItemsOrderRelationAddressRelationUserRelation';
  addresses: Array<OrderItemsOrderRelationAddressRelationUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<OrderItemsOrderRelationAddressRelationUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsOrderRelationAddressRelationUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type OrderItemsOrderRelationAddressRelationUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type OrderItemsOrderRelationAddressRelationUserRelationAddressesRelation = {
  __typename?: 'OrderItemsOrderRelationAddressRelationUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrderItemsOrderRelationAddressRelationUserRelationSessionsRelation = {
  __typename?: 'OrderItemsOrderRelationAddressRelationUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<OrderItemsOrderRelationAddressRelationUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderItemsOrderRelationAddressRelationUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderItemsOrderRelationAddressRelationUserRelationSessionsRelationUserRelation = {
  __typename?: 'OrderItemsOrderRelationAddressRelationUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationItemsRelation = {
  __typename?: 'OrderItemsOrderRelationItemsRelation';
  id: Scalars['String']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitPrice: Scalars['Int']['output'];
};

export type OrderItemsOrderRelationStoreRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrderItemsOrderRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrderItemsOrderRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsOrderRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderItemsOrderRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderItemsOrderRelationStoreRelationInventoryRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderItemsOrderRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderItemsOrderRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsOrderRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderItemsOrderRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationInventoryRelationProductRelation';
  category?: Maybe<OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationStoreRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationStoreRelationProductsRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationProductsRelation';
  category?: Maybe<OrderItemsOrderRelationStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrderItemsOrderRelationStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsOrderRelationStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrderItemsOrderRelationStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderItemsOrderRelationStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderItemsOrderRelationStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrderItemsOrderRelationStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrderItemsOrderRelationStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderItemsOrderRelationStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationProductRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationStoreRelationProductsRelationStoreRelation = {
  __typename?: 'OrderItemsOrderRelationStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationUserRelation = {
  __typename?: 'OrderItemsOrderRelationUserRelation';
  addresses: Array<OrderItemsOrderRelationUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<OrderItemsOrderRelationUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsOrderRelationUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type OrderItemsOrderRelationUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type OrderItemsOrderRelationUserRelationAddressesRelation = {
  __typename?: 'OrderItemsOrderRelationUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrderItemsOrderRelationUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderItemsOrderRelationUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderItemsOrderRelationUserRelationAddressesRelationUserRelation = {
  __typename?: 'OrderItemsOrderRelationUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsOrderRelationUserRelationSessionsRelation = {
  __typename?: 'OrderItemsOrderRelationUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<OrderItemsOrderRelationUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderItemsOrderRelationUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderItemsOrderRelationUserRelationSessionsRelationUserRelation = {
  __typename?: 'OrderItemsOrderRelationUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsProductIdFilters = {
  OR?: InputMaybe<Array<OrderItemsProductIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsProductIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsProductRelation = {
  __typename?: 'OrderItemsProductRelation';
  category?: Maybe<OrderItemsProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrderItemsProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrderItemsProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrderItemsProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderItemsProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderItemsProductRelationCategoryRelation = {
  __typename?: 'OrderItemsProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrderItemsProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrderItemsProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderItemsProductRelationCategoryRelationProductsRelation = {
  __typename?: 'OrderItemsProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsProductRelationInventoryRelation = {
  __typename?: 'OrderItemsProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderItemsProductRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderItemsProductRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsProductRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderItemsProductRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderItemsProductRelationInventoryRelationProductRelation = {
  __typename?: 'OrderItemsProductRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsProductRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderItemsProductRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrderItemsProductRelationInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrderItemsProductRelationInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsProductRelationInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderItemsProductRelationInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderItemsProductRelationInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'OrderItemsProductRelationInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsProductRelationInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'OrderItemsProductRelationInventoryRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsProductRelationStoreRelation = {
  __typename?: 'OrderItemsProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrderItemsProductRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrderItemsProductRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsProductRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderItemsProductRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderItemsProductRelationStoreRelationInventoryRelation = {
  __typename?: 'OrderItemsProductRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderItemsProductRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderItemsProductRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderItemsProductRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderItemsProductRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderItemsProductRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'OrderItemsProductRelationStoreRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsProductRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderItemsProductRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsProductRelationStoreRelationProductsRelation = {
  __typename?: 'OrderItemsProductRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderItemsQuantityFilters = {
  OR?: InputMaybe<Array<OrderItemsQuantityfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsQuantityfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsSelectItem = {
  __typename?: 'OrderItemsSelectItem';
  id: Scalars['String']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  order?: Maybe<OrderItemsOrderRelation>;
  orderId: Scalars['String']['output'];
  product?: Maybe<OrderItemsProductRelation>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitPrice: Scalars['Int']['output'];
};


export type OrderItemsSelectItemOrderArgs = {
  where?: InputMaybe<OrdersFilters>;
};


export type OrderItemsSelectItemProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};

export type OrderItemsUnitFilters = {
  OR?: InputMaybe<Array<OrderItemsUnitfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsUnitPriceFilters = {
  OR?: InputMaybe<Array<OrderItemsUnitPricefiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsUnitPricefiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsUnitfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItemsUpdateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  mrp?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderStatusHistoryChangedByFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryChangedByfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryChangedByfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryCreatedAtFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryFiltersOr>>;
  changedBy?: InputMaybe<OrderStatusHistoryChangedByFilters>;
  createdAt?: InputMaybe<OrderStatusHistoryCreatedAtFilters>;
  fromStatus?: InputMaybe<OrderStatusHistoryFromStatusFilters>;
  id?: InputMaybe<OrderStatusHistoryIdFilters>;
  orderId?: InputMaybe<OrderStatusHistoryOrderIdFilters>;
  reason?: InputMaybe<OrderStatusHistoryReasonFilters>;
  toStatus?: InputMaybe<OrderStatusHistoryToStatusFilters>;
};

export type OrderStatusHistoryFiltersOr = {
  changedBy?: InputMaybe<OrderStatusHistoryChangedByFilters>;
  createdAt?: InputMaybe<OrderStatusHistoryCreatedAtFilters>;
  fromStatus?: InputMaybe<OrderStatusHistoryFromStatusFilters>;
  id?: InputMaybe<OrderStatusHistoryIdFilters>;
  orderId?: InputMaybe<OrderStatusHistoryOrderIdFilters>;
  reason?: InputMaybe<OrderStatusHistoryReasonFilters>;
  toStatus?: InputMaybe<OrderStatusHistoryToStatusFilters>;
};

export type OrderStatusHistoryFromStatusEnum =
  /** Value: CANCELLED */
  | 'CANCELLED'
  /** Value: DELIVERED */
  | 'DELIVERED'
  /** Value: OUT_FOR_DELIVERY */
  | 'OUT_FOR_DELIVERY'
  /** Value: PACKED */
  | 'PACKED'
  /** Value: PLACED */
  | 'PLACED';

export type OrderStatusHistoryFromStatusFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryFromStatusfiltersOr>>;
  eq?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  gt?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  gte?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<OrderStatusHistoryFromStatusEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  lte?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  ne?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<OrderStatusHistoryFromStatusEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryFromStatusfiltersOr = {
  eq?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  gt?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  gte?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<OrderStatusHistoryFromStatusEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  lte?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  ne?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<OrderStatusHistoryFromStatusEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryIdFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryInsertInput = {
  changedBy?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  fromStatus?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  id?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  toStatus: OrderStatusHistoryToStatusEnum;
};

export type OrderStatusHistoryItem = {
  __typename?: 'OrderStatusHistoryItem';
  changedBy?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  fromStatus?: Maybe<OrderStatusHistoryFromStatusEnum>;
  id: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  toStatus: OrderStatusHistoryToStatusEnum;
};

export type OrderStatusHistoryOrderBy = {
  changedBy?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  fromStatus?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  orderId?: InputMaybe<InnerOrder>;
  reason?: InputMaybe<InnerOrder>;
  toStatus?: InputMaybe<InnerOrder>;
};

export type OrderStatusHistoryOrderIdFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryOrderIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryOrderIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryOrderRelation = {
  __typename?: 'OrderStatusHistoryOrderRelation';
  address?: Maybe<OrderStatusHistoryOrderRelationAddressRelation>;
  addressId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  items: Array<OrderStatusHistoryOrderRelationItemsRelation>;
  paymentMethod: Scalars['String']['output'];
  /** Date */
  placedAt: Scalars['String']['output'];
  status: OrdersStatusEnum;
  store?: Maybe<OrderStatusHistoryOrderRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrderStatusHistoryOrderRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationAddressArgs = {
  where?: InputMaybe<AddressesFilters>;
};


export type OrderStatusHistoryOrderRelationItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrderItemsOrderBy>;
  where?: InputMaybe<OrderItemsFilters>;
};


export type OrderStatusHistoryOrderRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};


export type OrderStatusHistoryOrderRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryOrderRelationAddressRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationAddressRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrderStatusHistoryOrderRelationAddressRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationAddressRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryOrderRelationAddressRelationUserRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationAddressRelationUserRelation';
  addresses: Array<OrderStatusHistoryOrderRelationAddressRelationUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationAddressRelationUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type OrderStatusHistoryOrderRelationAddressRelationUserRelationAddressesRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationAddressRelationUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsRelationUserRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationAddressRelationUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelation';
  id: Scalars['String']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  order?: Maybe<OrderStatusHistoryOrderRelationItemsRelationOrderRelation>;
  orderId: Scalars['String']['output'];
  product?: Maybe<OrderStatusHistoryOrderRelationItemsRelationProductRelation>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitPrice: Scalars['Int']['output'];
};


export type OrderStatusHistoryOrderRelationItemsRelationOrderArgs = {
  where?: InputMaybe<OrdersFilters>;
};


export type OrderStatusHistoryOrderRelationItemsRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};

export type OrderStatusHistoryOrderRelationItemsRelationOrderRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationOrderRelation';
  addressId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  /** Date */
  placedAt: Scalars['String']['output'];
  status: OrdersStatusEnum;
  storeId: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelation';
  category?: Maybe<OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationProductRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationProductsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationItemsRelationProductRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrderStatusHistoryOrderRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrderStatusHistoryOrderRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderStatusHistoryOrderRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderStatusHistoryOrderRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelation';
  category?: Maybe<OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelationProductsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationProductsRelation';
  category?: Maybe<OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrderStatusHistoryOrderRelationStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationProductRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationStoreRelationProductsRelationStoreRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationUserRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationUserRelation';
  addresses: Array<OrderStatusHistoryOrderRelationUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<OrderStatusHistoryOrderRelationUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type OrderStatusHistoryOrderRelationUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type OrderStatusHistoryOrderRelationUserRelationAddressesRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrderStatusHistoryOrderRelationUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryOrderRelationUserRelationAddressesRelationUserRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryOrderRelationUserRelationSessionsRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<OrderStatusHistoryOrderRelationUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderStatusHistoryOrderRelationUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryOrderRelationUserRelationSessionsRelationUserRelation = {
  __typename?: 'OrderStatusHistoryOrderRelationUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryReasonFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryReasonfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryReasonfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistorySelectItem = {
  __typename?: 'OrderStatusHistorySelectItem';
  changedBy?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  fromStatus?: Maybe<OrderStatusHistoryFromStatusEnum>;
  id: Scalars['String']['output'];
  order?: Maybe<OrderStatusHistoryOrderRelation>;
  orderId: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  toStatus: OrderStatusHistoryToStatusEnum;
  user?: Maybe<OrderStatusHistoryUserRelation>;
};


export type OrderStatusHistorySelectItemOrderArgs = {
  where?: InputMaybe<OrdersFilters>;
};


export type OrderStatusHistorySelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryToStatusEnum =
  /** Value: CANCELLED */
  | 'CANCELLED'
  /** Value: DELIVERED */
  | 'DELIVERED'
  /** Value: OUT_FOR_DELIVERY */
  | 'OUT_FOR_DELIVERY'
  /** Value: PACKED */
  | 'PACKED'
  /** Value: PLACED */
  | 'PLACED';

export type OrderStatusHistoryToStatusFilters = {
  OR?: InputMaybe<Array<OrderStatusHistoryToStatusfiltersOr>>;
  eq?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  gt?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  gte?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<OrderStatusHistoryToStatusEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  lte?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  ne?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<OrderStatusHistoryToStatusEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryToStatusfiltersOr = {
  eq?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  gt?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  gte?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<OrderStatusHistoryToStatusEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  lte?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  ne?: InputMaybe<OrderStatusHistoryToStatusEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<OrderStatusHistoryToStatusEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrderStatusHistoryUpdateInput = {
  changedBy?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  fromStatus?: InputMaybe<OrderStatusHistoryFromStatusEnum>;
  id?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  toStatus?: InputMaybe<OrderStatusHistoryToStatusEnum>;
};

export type OrderStatusHistoryUserRelation = {
  __typename?: 'OrderStatusHistoryUserRelation';
  addresses: Array<OrderStatusHistoryUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<OrderStatusHistoryUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrderStatusHistoryUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type OrderStatusHistoryUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type OrderStatusHistoryUserRelationAddressesRelation = {
  __typename?: 'OrderStatusHistoryUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrderStatusHistoryUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderStatusHistoryUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryUserRelationAddressesRelationUserRelation = {
  __typename?: 'OrderStatusHistoryUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrderStatusHistoryUserRelationSessionsRelation = {
  __typename?: 'OrderStatusHistoryUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<OrderStatusHistoryUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrderStatusHistoryUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrderStatusHistoryUserRelationSessionsRelationUserRelation = {
  __typename?: 'OrderStatusHistoryUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersAddressIdFilters = {
  OR?: InputMaybe<Array<OrdersAddressIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersAddressIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersAddressRelation = {
  __typename?: 'OrdersAddressRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrdersAddressRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrdersAddressRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrdersAddressRelationUserRelation = {
  __typename?: 'OrdersAddressRelationUserRelation';
  addresses: Array<OrdersAddressRelationUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<OrdersAddressRelationUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersAddressRelationUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type OrdersAddressRelationUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type OrdersAddressRelationUserRelationAddressesRelation = {
  __typename?: 'OrdersAddressRelationUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrdersAddressRelationUserRelationSessionsRelation = {
  __typename?: 'OrdersAddressRelationUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<OrdersAddressRelationUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrdersAddressRelationUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrdersAddressRelationUserRelationSessionsRelationUserRelation = {
  __typename?: 'OrdersAddressRelationUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersCreatedAtFilters = {
  OR?: InputMaybe<Array<OrdersCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersDeliveryFeeFilters = {
  OR?: InputMaybe<Array<OrdersDeliveryFeefiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersDeliveryFeefiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersDiscountFilters = {
  OR?: InputMaybe<Array<OrdersDiscountfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersDiscountfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersFilters = {
  OR?: InputMaybe<Array<OrdersFiltersOr>>;
  addressId?: InputMaybe<OrdersAddressIdFilters>;
  createdAt?: InputMaybe<OrdersCreatedAtFilters>;
  deliveryFee?: InputMaybe<OrdersDeliveryFeeFilters>;
  discount?: InputMaybe<OrdersDiscountFilters>;
  id?: InputMaybe<OrdersIdFilters>;
  idempotencyKey?: InputMaybe<OrdersIdempotencyKeyFilters>;
  paymentMethod?: InputMaybe<OrdersPaymentMethodFilters>;
  placedAt?: InputMaybe<OrdersPlacedAtFilters>;
  status?: InputMaybe<OrdersStatusFilters>;
  storeId?: InputMaybe<OrdersStoreIdFilters>;
  subtotal?: InputMaybe<OrdersSubtotalFilters>;
  total?: InputMaybe<OrdersTotalFilters>;
  updatedAt?: InputMaybe<OrdersUpdatedAtFilters>;
  userId?: InputMaybe<OrdersUserIdFilters>;
};

export type OrdersFiltersOr = {
  addressId?: InputMaybe<OrdersAddressIdFilters>;
  createdAt?: InputMaybe<OrdersCreatedAtFilters>;
  deliveryFee?: InputMaybe<OrdersDeliveryFeeFilters>;
  discount?: InputMaybe<OrdersDiscountFilters>;
  id?: InputMaybe<OrdersIdFilters>;
  idempotencyKey?: InputMaybe<OrdersIdempotencyKeyFilters>;
  paymentMethod?: InputMaybe<OrdersPaymentMethodFilters>;
  placedAt?: InputMaybe<OrdersPlacedAtFilters>;
  status?: InputMaybe<OrdersStatusFilters>;
  storeId?: InputMaybe<OrdersStoreIdFilters>;
  subtotal?: InputMaybe<OrdersSubtotalFilters>;
  total?: InputMaybe<OrdersTotalFilters>;
  updatedAt?: InputMaybe<OrdersUpdatedAtFilters>;
  userId?: InputMaybe<OrdersUserIdFilters>;
};

export type OrdersIdFilters = {
  OR?: InputMaybe<Array<OrdersIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersIdempotencyKeyFilters = {
  OR?: InputMaybe<Array<OrdersIdempotencyKeyfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersIdempotencyKeyfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersInsertInput = {
  addressId: Scalars['String']['input'];
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deliveryFee: Scalars['Int']['input'];
  discount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idempotencyKey: Scalars['String']['input'];
  paymentMethod: Scalars['String']['input'];
  /** Date */
  placedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrdersStatusEnum>;
  storeId: Scalars['String']['input'];
  subtotal: Scalars['Int']['input'];
  total: Scalars['Int']['input'];
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type OrdersItem = {
  __typename?: 'OrdersItem';
  addressId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  /** Date */
  placedAt: Scalars['String']['output'];
  status: OrdersStatusEnum;
  storeId: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrdersItemsRelation = {
  __typename?: 'OrdersItemsRelation';
  id: Scalars['String']['output'];
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  order?: Maybe<OrdersItemsRelationOrderRelation>;
  orderId: Scalars['String']['output'];
  product?: Maybe<OrdersItemsRelationProductRelation>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  unitPrice: Scalars['Int']['output'];
};


export type OrdersItemsRelationOrderArgs = {
  where?: InputMaybe<OrdersFilters>;
};


export type OrdersItemsRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};

export type OrdersItemsRelationOrderRelation = {
  __typename?: 'OrdersItemsRelationOrderRelation';
  addressId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  /** Date */
  placedAt: Scalars['String']['output'];
  status: OrdersStatusEnum;
  storeId: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrdersItemsRelationProductRelation = {
  __typename?: 'OrdersItemsRelationProductRelation';
  category?: Maybe<OrdersItemsRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrdersItemsRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrdersItemsRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersItemsRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrdersItemsRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrdersItemsRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrdersItemsRelationProductRelationCategoryRelation = {
  __typename?: 'OrdersItemsRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrdersItemsRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrdersItemsRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrdersItemsRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'OrdersItemsRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersItemsRelationProductRelationInventoryRelation = {
  __typename?: 'OrdersItemsRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrdersItemsRelationProductRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrdersItemsRelationProductRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersItemsRelationProductRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrdersItemsRelationProductRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrdersItemsRelationProductRelationInventoryRelationProductRelation = {
  __typename?: 'OrdersItemsRelationProductRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersItemsRelationProductRelationInventoryRelationStoreRelation = {
  __typename?: 'OrdersItemsRelationProductRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrdersItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrdersItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersItemsRelationProductRelationInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrdersItemsRelationProductRelationInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrdersItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'OrdersItemsRelationProductRelationInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'OrdersItemsRelationProductRelationInventoryRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersItemsRelationProductRelationStoreRelation = {
  __typename?: 'OrdersItemsRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrdersItemsRelationProductRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrdersItemsRelationProductRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersItemsRelationProductRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrdersItemsRelationProductRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrdersItemsRelationProductRelationStoreRelationInventoryRelation = {
  __typename?: 'OrdersItemsRelationProductRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrdersItemsRelationProductRelationStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrdersItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersItemsRelationProductRelationStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrdersItemsRelationProductRelationStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrdersItemsRelationProductRelationStoreRelationInventoryRelationProductRelation = {
  __typename?: 'OrdersItemsRelationProductRelationStoreRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'OrdersItemsRelationProductRelationStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersItemsRelationProductRelationStoreRelationProductsRelation = {
  __typename?: 'OrdersItemsRelationProductRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersOrderBy = {
  addressId?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  deliveryFee?: InputMaybe<InnerOrder>;
  discount?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  idempotencyKey?: InputMaybe<InnerOrder>;
  paymentMethod?: InputMaybe<InnerOrder>;
  placedAt?: InputMaybe<InnerOrder>;
  status?: InputMaybe<InnerOrder>;
  storeId?: InputMaybe<InnerOrder>;
  subtotal?: InputMaybe<InnerOrder>;
  total?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
  userId?: InputMaybe<InnerOrder>;
};

export type OrdersPaymentMethodFilters = {
  OR?: InputMaybe<Array<OrdersPaymentMethodfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersPaymentMethodfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersPlacedAtFilters = {
  OR?: InputMaybe<Array<OrdersPlacedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersPlacedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersSelectItem = {
  __typename?: 'OrdersSelectItem';
  address?: Maybe<OrdersAddressRelation>;
  addressId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  deliveryFee: Scalars['Int']['output'];
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  items: Array<OrdersItemsRelation>;
  paymentMethod: Scalars['String']['output'];
  /** Date */
  placedAt: Scalars['String']['output'];
  status: OrdersStatusEnum;
  store?: Maybe<OrdersStoreRelation>;
  storeId: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrdersUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrdersSelectItemAddressArgs = {
  where?: InputMaybe<AddressesFilters>;
};


export type OrdersSelectItemItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrderItemsOrderBy>;
  where?: InputMaybe<OrderItemsFilters>;
};


export type OrdersSelectItemStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};


export type OrdersSelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrdersStatusEnum =
  /** Value: CANCELLED */
  | 'CANCELLED'
  /** Value: DELIVERED */
  | 'DELIVERED'
  /** Value: OUT_FOR_DELIVERY */
  | 'OUT_FOR_DELIVERY'
  /** Value: PACKED */
  | 'PACKED'
  /** Value: PLACED */
  | 'PLACED';

export type OrdersStatusFilters = {
  OR?: InputMaybe<Array<OrdersStatusfiltersOr>>;
  eq?: InputMaybe<OrdersStatusEnum>;
  gt?: InputMaybe<OrdersStatusEnum>;
  gte?: InputMaybe<OrdersStatusEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<OrdersStatusEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<OrdersStatusEnum>;
  lte?: InputMaybe<OrdersStatusEnum>;
  ne?: InputMaybe<OrdersStatusEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<OrdersStatusEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersStatusfiltersOr = {
  eq?: InputMaybe<OrdersStatusEnum>;
  gt?: InputMaybe<OrdersStatusEnum>;
  gte?: InputMaybe<OrdersStatusEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<OrdersStatusEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<OrdersStatusEnum>;
  lte?: InputMaybe<OrdersStatusEnum>;
  ne?: InputMaybe<OrdersStatusEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<OrdersStatusEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersStoreIdFilters = {
  OR?: InputMaybe<Array<OrdersStoreIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersStoreIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersStoreRelation = {
  __typename?: 'OrdersStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<OrdersStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<OrdersStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrdersStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrdersStoreRelationInventoryRelation = {
  __typename?: 'OrdersStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrdersStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrdersStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrdersStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrdersStoreRelationInventoryRelationProductRelation = {
  __typename?: 'OrdersStoreRelationInventoryRelationProductRelation';
  category?: Maybe<OrdersStoreRelationInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrdersStoreRelationInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrdersStoreRelationInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersStoreRelationInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrdersStoreRelationInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrdersStoreRelationInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrdersStoreRelationInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'OrdersStoreRelationInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrdersStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrdersStoreRelationInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrdersStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'OrdersStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersStoreRelationInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'OrdersStoreRelationInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersStoreRelationInventoryRelationProductRelationStoreRelation = {
  __typename?: 'OrdersStoreRelationInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'OrdersStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersStoreRelationProductsRelation = {
  __typename?: 'OrdersStoreRelationProductsRelation';
  category?: Maybe<OrdersStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<OrdersStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<OrdersStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type OrdersStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type OrdersStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrdersStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'OrdersStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<OrdersStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type OrdersStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type OrdersStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'OrdersStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'OrdersStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<OrdersStoreRelationProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<OrdersStoreRelationProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersStoreRelationProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type OrdersStoreRelationProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type OrdersStoreRelationProductsRelationInventoryRelationProductRelation = {
  __typename?: 'OrdersStoreRelationProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersStoreRelationProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'OrdersStoreRelationProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersStoreRelationProductsRelationStoreRelation = {
  __typename?: 'OrdersStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersSubtotalFilters = {
  OR?: InputMaybe<Array<OrdersSubtotalfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersSubtotalfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersTotalFilters = {
  OR?: InputMaybe<Array<OrdersTotalfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersTotalfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersUpdateInput = {
  addressId?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deliveryFee?: InputMaybe<Scalars['Int']['input']>;
  discount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idempotencyKey?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  placedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrdersStatusEnum>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  subtotal?: InputMaybe<Scalars['Int']['input']>;
  total?: InputMaybe<Scalars['Int']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersUpdatedAtFilters = {
  OR?: InputMaybe<Array<OrdersUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersUserIdFilters = {
  OR?: InputMaybe<Array<OrdersUserIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersUserIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersUserRelation = {
  __typename?: 'OrdersUserRelation';
  addresses: Array<OrdersUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<OrdersUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type OrdersUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type OrdersUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type OrdersUserRelationAddressesRelation = {
  __typename?: 'OrdersUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<OrdersUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrdersUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrdersUserRelationAddressesRelationUserRelation = {
  __typename?: 'OrdersUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OrdersUserRelationSessionsRelation = {
  __typename?: 'OrdersUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<OrdersUserRelationSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type OrdersUserRelationSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type OrdersUserRelationSessionsRelationUserRelation = {
  __typename?: 'OrdersUserRelationSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type OtpChallengesCodeFilters = {
  OR?: InputMaybe<Array<OtpChallengesCodefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesCodefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesConsumedAtFilters = {
  OR?: InputMaybe<Array<OtpChallengesConsumedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesConsumedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesCreatedAtFilters = {
  OR?: InputMaybe<Array<OtpChallengesCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesExpiresAtFilters = {
  OR?: InputMaybe<Array<OtpChallengesExpiresAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesExpiresAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesFilters = {
  OR?: InputMaybe<Array<OtpChallengesFiltersOr>>;
  code?: InputMaybe<OtpChallengesCodeFilters>;
  consumedAt?: InputMaybe<OtpChallengesConsumedAtFilters>;
  createdAt?: InputMaybe<OtpChallengesCreatedAtFilters>;
  expiresAt?: InputMaybe<OtpChallengesExpiresAtFilters>;
  id?: InputMaybe<OtpChallengesIdFilters>;
  phone?: InputMaybe<OtpChallengesPhoneFilters>;
  sessionId?: InputMaybe<OtpChallengesSessionIdFilters>;
};

export type OtpChallengesFiltersOr = {
  code?: InputMaybe<OtpChallengesCodeFilters>;
  consumedAt?: InputMaybe<OtpChallengesConsumedAtFilters>;
  createdAt?: InputMaybe<OtpChallengesCreatedAtFilters>;
  expiresAt?: InputMaybe<OtpChallengesExpiresAtFilters>;
  id?: InputMaybe<OtpChallengesIdFilters>;
  phone?: InputMaybe<OtpChallengesPhoneFilters>;
  sessionId?: InputMaybe<OtpChallengesSessionIdFilters>;
};

export type OtpChallengesIdFilters = {
  OR?: InputMaybe<Array<OtpChallengesIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesInsertInput = {
  code: Scalars['String']['input'];
  /** Date */
  consumedAt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  expiresAt: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesItem = {
  __typename?: 'OtpChallengesItem';
  code: Scalars['String']['output'];
  /** Date */
  consumedAt?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  sessionId?: Maybe<Scalars['String']['output']>;
};

export type OtpChallengesOrderBy = {
  code?: InputMaybe<InnerOrder>;
  consumedAt?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  expiresAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  phone?: InputMaybe<InnerOrder>;
  sessionId?: InputMaybe<InnerOrder>;
};

export type OtpChallengesPhoneFilters = {
  OR?: InputMaybe<Array<OtpChallengesPhonefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesPhonefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesSelectItem = {
  __typename?: 'OtpChallengesSelectItem';
  code: Scalars['String']['output'];
  /** Date */
  consumedAt?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  sessionId?: Maybe<Scalars['String']['output']>;
};

export type OtpChallengesSessionIdFilters = {
  OR?: InputMaybe<Array<OtpChallengesSessionIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesSessionIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type OtpChallengesUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  consumedAt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsCategoryIdFilters = {
  OR?: InputMaybe<Array<ProductsCategoryIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsCategoryIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsCategoryRelation = {
  __typename?: 'ProductsCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<ProductsCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type ProductsCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type ProductsCategoryRelationProductsRelation = {
  __typename?: 'ProductsCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsCreatedAtFilters = {
  OR?: InputMaybe<Array<ProductsCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsDescriptionFilters = {
  OR?: InputMaybe<Array<ProductsDescriptionfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsDescriptionfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsEmojiFilters = {
  OR?: InputMaybe<Array<ProductsEmojifiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsEmojifiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsFilters = {
  OR?: InputMaybe<Array<ProductsFiltersOr>>;
  categoryId?: InputMaybe<ProductsCategoryIdFilters>;
  createdAt?: InputMaybe<ProductsCreatedAtFilters>;
  description?: InputMaybe<ProductsDescriptionFilters>;
  emoji?: InputMaybe<ProductsEmojiFilters>;
  id?: InputMaybe<ProductsIdFilters>;
  imageUrl?: InputMaybe<ProductsImageUrlFilters>;
  isActive?: InputMaybe<ProductsIsActiveFilters>;
  markup?: InputMaybe<ProductsMarkupFilters>;
  markupType?: InputMaybe<ProductsMarkupTypeFilters>;
  mrp?: InputMaybe<ProductsMrpFilters>;
  name?: InputMaybe<ProductsNameFilters>;
  originalPrice?: InputMaybe<ProductsOriginalPriceFilters>;
  price?: InputMaybe<ProductsPriceFilters>;
  storeId?: InputMaybe<ProductsStoreIdFilters>;
  timeBoundSections?: InputMaybe<ProductsTimeBoundSectionsFilters>;
  trackInventory?: InputMaybe<ProductsTrackInventoryFilters>;
  unit?: InputMaybe<ProductsUnitFilters>;
  updatedAt?: InputMaybe<ProductsUpdatedAtFilters>;
};

export type ProductsFiltersOr = {
  categoryId?: InputMaybe<ProductsCategoryIdFilters>;
  createdAt?: InputMaybe<ProductsCreatedAtFilters>;
  description?: InputMaybe<ProductsDescriptionFilters>;
  emoji?: InputMaybe<ProductsEmojiFilters>;
  id?: InputMaybe<ProductsIdFilters>;
  imageUrl?: InputMaybe<ProductsImageUrlFilters>;
  isActive?: InputMaybe<ProductsIsActiveFilters>;
  markup?: InputMaybe<ProductsMarkupFilters>;
  markupType?: InputMaybe<ProductsMarkupTypeFilters>;
  mrp?: InputMaybe<ProductsMrpFilters>;
  name?: InputMaybe<ProductsNameFilters>;
  originalPrice?: InputMaybe<ProductsOriginalPriceFilters>;
  price?: InputMaybe<ProductsPriceFilters>;
  storeId?: InputMaybe<ProductsStoreIdFilters>;
  timeBoundSections?: InputMaybe<ProductsTimeBoundSectionsFilters>;
  trackInventory?: InputMaybe<ProductsTrackInventoryFilters>;
  unit?: InputMaybe<ProductsUnitFilters>;
  updatedAt?: InputMaybe<ProductsUpdatedAtFilters>;
};

export type ProductsIdFilters = {
  OR?: InputMaybe<Array<ProductsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsImageUrlFilters = {
  OR?: InputMaybe<Array<ProductsImageUrlfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsImageUrlfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsInsertInput = {
  categoryId: Scalars['String']['input'];
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  markup?: InputMaybe<Scalars['Int']['input']>;
  markupType?: InputMaybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  timeBoundSections?: InputMaybe<Scalars['String']['input']>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  unit: Scalars['String']['input'];
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsInventoryRelation = {
  __typename?: 'ProductsInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<ProductsInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<ProductsInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type ProductsInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type ProductsInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type ProductsInventoryRelationProductRelation = {
  __typename?: 'ProductsInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsInventoryRelationStoreRelation = {
  __typename?: 'ProductsInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<ProductsInventoryRelationStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<ProductsInventoryRelationStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type ProductsInventoryRelationStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type ProductsInventoryRelationStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type ProductsInventoryRelationStoreRelationInventoryRelation = {
  __typename?: 'ProductsInventoryRelationStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsInventoryRelationStoreRelationProductsRelation = {
  __typename?: 'ProductsInventoryRelationStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsIsActiveFilters = {
  OR?: InputMaybe<Array<ProductsIsActivefiltersOr>>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsIsActivefiltersOr = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsItem = {
  __typename?: 'ProductsItem';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Array<TimeBoundSectionId>;
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsMarkupFilters = {
  OR?: InputMaybe<Array<ProductsMarkupfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsMarkupTypeEnum =
  /** Value: AMOUNT */
  | 'AMOUNT'
  /** Value: PERCENTAGE */
  | 'PERCENTAGE';

export type ProductsMarkupTypeFilters = {
  OR?: InputMaybe<Array<ProductsMarkupTypefiltersOr>>;
  eq?: InputMaybe<ProductsMarkupTypeEnum>;
  gt?: InputMaybe<ProductsMarkupTypeEnum>;
  gte?: InputMaybe<ProductsMarkupTypeEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<ProductsMarkupTypeEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<ProductsMarkupTypeEnum>;
  lte?: InputMaybe<ProductsMarkupTypeEnum>;
  ne?: InputMaybe<ProductsMarkupTypeEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<ProductsMarkupTypeEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsMarkupTypefiltersOr = {
  eq?: InputMaybe<ProductsMarkupTypeEnum>;
  gt?: InputMaybe<ProductsMarkupTypeEnum>;
  gte?: InputMaybe<ProductsMarkupTypeEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<ProductsMarkupTypeEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<ProductsMarkupTypeEnum>;
  lte?: InputMaybe<ProductsMarkupTypeEnum>;
  ne?: InputMaybe<ProductsMarkupTypeEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<ProductsMarkupTypeEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsMarkupfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsMrpFilters = {
  OR?: InputMaybe<Array<ProductsMrpfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsMrpfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsNameFilters = {
  OR?: InputMaybe<Array<ProductsNamefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsNamefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsOrderBy = {
  categoryId?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  description?: InputMaybe<InnerOrder>;
  emoji?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  imageUrl?: InputMaybe<InnerOrder>;
  isActive?: InputMaybe<InnerOrder>;
  markup?: InputMaybe<InnerOrder>;
  markupType?: InputMaybe<InnerOrder>;
  mrp?: InputMaybe<InnerOrder>;
  name?: InputMaybe<InnerOrder>;
  originalPrice?: InputMaybe<InnerOrder>;
  price?: InputMaybe<InnerOrder>;
  storeId?: InputMaybe<InnerOrder>;
  timeBoundSections?: InputMaybe<InnerOrder>;
  trackInventory?: InputMaybe<InnerOrder>;
  unit?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
};

export type ProductsOriginalPriceFilters = {
  OR?: InputMaybe<Array<ProductsOriginalPricefiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsOriginalPricefiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsPriceFilters = {
  OR?: InputMaybe<Array<ProductsPricefiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsPricefiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsSelectItem = {
  __typename?: 'ProductsSelectItem';
  category?: Maybe<ProductsCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<ProductsInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<ProductsStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Array<TimeBoundSectionId>;
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type ProductsSelectItemCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type ProductsSelectItemInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type ProductsSelectItemStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type ProductsStoreIdFilters = {
  OR?: InputMaybe<Array<ProductsStoreIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsStoreIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsStoreRelation = {
  __typename?: 'ProductsStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<ProductsStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<ProductsStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type ProductsStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type ProductsStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type ProductsStoreRelationInventoryRelation = {
  __typename?: 'ProductsStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<ProductsStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<ProductsStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type ProductsStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type ProductsStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type ProductsStoreRelationInventoryRelationProductRelation = {
  __typename?: 'ProductsStoreRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'ProductsStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsStoreRelationProductsRelation = {
  __typename?: 'ProductsStoreRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type ProductsTimeBoundSectionsFilters = {
  OR?: InputMaybe<Array<ProductsTimeBoundSectionsfiltersOr>>;
  /** JSON */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<JSON> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<JSON> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsTimeBoundSectionsfiltersOr = {
  /** JSON */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<JSON> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<JSON> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsTrackInventoryFilters = {
  OR?: InputMaybe<Array<ProductsTrackInventoryfiltersOr>>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsTrackInventoryfiltersOr = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsUnitFilters = {
  OR?: InputMaybe<Array<ProductsUnitfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsUnitfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsUpdateInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  markup?: InputMaybe<Scalars['Int']['input']>;
  markupType?: InputMaybe<ProductsMarkupTypeEnum>;
  mrp?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  /** JSON */
  timeBoundSections?: InputMaybe<Scalars['String']['input']>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsUpdatedAtFilters = {
  OR?: InputMaybe<Array<ProductsUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  adminCategories: Array<AdminCategory>;
  adminCategory?: Maybe<AdminCategory>;
  adminCustomer?: Maybe<AdminUser>;
  adminCustomers: AdminCustomersPage;
  adminDashboard: AdminDashboard;
  adminInventory: AdminInventoryPage;
  adminOrder?: Maybe<AdminOrder>;
  adminOrders: AdminOrdersPage;
  adminProduct?: Maybe<AdminProduct>;
  adminProducts: AdminProductsPage;
  adminSession?: Maybe<AdminSession>;
  adminSetupStatus: AdminSetupStatus;
  adminStore?: Maybe<AdminStore>;
  adminStores: Array<AdminStore>;
  availableDeliverySlots: AppDeliverySlots;
  categories: Array<CategoriesSelectItem>;
  categoriesSingle?: Maybe<CategoriesSelectItem>;
  checkServiceability: AppServiceability;
  me: AppUser;
  myAddresses: Array<AppAddress>;
  myCart: AppCart;
  myOrders: AppOrdersPage;
  products: Array<ProductsSelectItem>;
  productsSingle?: Maybe<ProductsSelectItem>;
  stores: Array<StoresSelectItem>;
  storesSingle?: Maybe<StoresSelectItem>;
  timeBoundSections: Array<TimeBoundSection>;
};


export type QueryAdminCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminCustomerArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminCustomersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdminInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  lowStockOnly?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['String']['input'];
};


export type QueryAdminOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<AdminOrderStatus>;
};


export type QueryAdminProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminProductsArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdminStoreArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminStoresArgs = {
  type?: InputMaybe<AdminStoreType>;
};


export type QueryAvailableDeliverySlotsArgs = {
  addressId: Scalars['String']['input'];
};


export type QueryCategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CategoriesOrderBy>;
  where?: InputMaybe<CategoriesFilters>;
};


export type QueryCategoriesSingleArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CategoriesOrderBy>;
  where?: InputMaybe<CategoriesFilters>;
};


export type QueryCheckServiceabilityArgs = {
  addressId?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryMyOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};


export type QueryProductsSingleArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};


export type QueryStoresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StoresOrderBy>;
  where?: InputMaybe<StoresFilters>;
};


export type QueryStoresSingleArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StoresOrderBy>;
  where?: InputMaybe<StoresFilters>;
};

export type SessionsCreatedAtFilters = {
  OR?: InputMaybe<Array<SessionsCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsExpiresAtFilters = {
  OR?: InputMaybe<Array<SessionsExpiresAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsExpiresAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsFilters = {
  OR?: InputMaybe<Array<SessionsFiltersOr>>;
  createdAt?: InputMaybe<SessionsCreatedAtFilters>;
  expiresAt?: InputMaybe<SessionsExpiresAtFilters>;
  id?: InputMaybe<SessionsIdFilters>;
  token?: InputMaybe<SessionsTokenFilters>;
  userId?: InputMaybe<SessionsUserIdFilters>;
};

export type SessionsFiltersOr = {
  createdAt?: InputMaybe<SessionsCreatedAtFilters>;
  expiresAt?: InputMaybe<SessionsExpiresAtFilters>;
  id?: InputMaybe<SessionsIdFilters>;
  token?: InputMaybe<SessionsTokenFilters>;
  userId?: InputMaybe<SessionsUserIdFilters>;
};

export type SessionsIdFilters = {
  OR?: InputMaybe<Array<SessionsIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsInsertInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  expiresAt: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type SessionsItem = {
  __typename?: 'SessionsItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type SessionsOrderBy = {
  createdAt?: InputMaybe<InnerOrder>;
  expiresAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  token?: InputMaybe<InnerOrder>;
  userId?: InputMaybe<InnerOrder>;
};

export type SessionsSelectItem = {
  __typename?: 'SessionsSelectItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<SessionsUserRelation>;
  userId: Scalars['String']['output'];
};


export type SessionsSelectItemUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type SessionsTokenFilters = {
  OR?: InputMaybe<Array<SessionsTokenfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsTokenfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsUpdateInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsUserIdFilters = {
  OR?: InputMaybe<Array<SessionsUserIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsUserIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type SessionsUserRelation = {
  __typename?: 'SessionsUserRelation';
  addresses: Array<SessionsUserRelationAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<SessionsUserRelationSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type SessionsUserRelationAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type SessionsUserRelationSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type SessionsUserRelationAddressesRelation = {
  __typename?: 'SessionsUserRelationAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<SessionsUserRelationAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type SessionsUserRelationAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type SessionsUserRelationAddressesRelationUserRelation = {
  __typename?: 'SessionsUserRelationAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type SessionsUserRelationSessionsRelation = {
  __typename?: 'SessionsUserRelationSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type StoreSlotConfigCapacityPerSlotFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigCapacityPerSlotfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigCapacityPerSlotfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigCreatedAtFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigDayEndMinutesFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigDayEndMinutesfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigDayEndMinutesfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigDayStartMinutesFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigDayStartMinutesfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigDayStartMinutesfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigFiltersOr>>;
  capacityPerSlot?: InputMaybe<StoreSlotConfigCapacityPerSlotFilters>;
  createdAt?: InputMaybe<StoreSlotConfigCreatedAtFilters>;
  dayEndMinutes?: InputMaybe<StoreSlotConfigDayEndMinutesFilters>;
  dayStartMinutes?: InputMaybe<StoreSlotConfigDayStartMinutesFilters>;
  id?: InputMaybe<StoreSlotConfigIdFilters>;
  slotDurationMinutes?: InputMaybe<StoreSlotConfigSlotDurationMinutesFilters>;
  storeId?: InputMaybe<StoreSlotConfigStoreIdFilters>;
};

export type StoreSlotConfigFiltersOr = {
  capacityPerSlot?: InputMaybe<StoreSlotConfigCapacityPerSlotFilters>;
  createdAt?: InputMaybe<StoreSlotConfigCreatedAtFilters>;
  dayEndMinutes?: InputMaybe<StoreSlotConfigDayEndMinutesFilters>;
  dayStartMinutes?: InputMaybe<StoreSlotConfigDayStartMinutesFilters>;
  id?: InputMaybe<StoreSlotConfigIdFilters>;
  slotDurationMinutes?: InputMaybe<StoreSlotConfigSlotDurationMinutesFilters>;
  storeId?: InputMaybe<StoreSlotConfigStoreIdFilters>;
};

export type StoreSlotConfigIdFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigInsertInput = {
  capacityPerSlot?: InputMaybe<Scalars['Int']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  dayEndMinutes?: InputMaybe<Scalars['Int']['input']>;
  dayStartMinutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  slotDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  storeId: Scalars['String']['input'];
};

export type StoreSlotConfigItem = {
  __typename?: 'StoreSlotConfigItem';
  capacityPerSlot: Scalars['Int']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  dayEndMinutes: Scalars['Int']['output'];
  dayStartMinutes: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  slotDurationMinutes: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
};

export type StoreSlotConfigOrderBy = {
  capacityPerSlot?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  dayEndMinutes?: InputMaybe<InnerOrder>;
  dayStartMinutes?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  slotDurationMinutes?: InputMaybe<InnerOrder>;
  storeId?: InputMaybe<InnerOrder>;
};

export type StoreSlotConfigSelectItem = {
  __typename?: 'StoreSlotConfigSelectItem';
  capacityPerSlot: Scalars['Int']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  dayEndMinutes: Scalars['Int']['output'];
  dayStartMinutes: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  slotDurationMinutes: Scalars['Int']['output'];
  store?: Maybe<StoreSlotConfigStoreRelation>;
  storeId: Scalars['String']['output'];
};


export type StoreSlotConfigSelectItemStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoreSlotConfigSlotDurationMinutesFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigSlotDurationMinutesfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigSlotDurationMinutesfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigStoreIdFilters = {
  OR?: InputMaybe<Array<StoreSlotConfigStoreIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigStoreIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoreSlotConfigStoreRelation = {
  __typename?: 'StoreSlotConfigStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<StoreSlotConfigStoreRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<StoreSlotConfigStoreRelationProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoreSlotConfigStoreRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type StoreSlotConfigStoreRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type StoreSlotConfigStoreRelationInventoryRelation = {
  __typename?: 'StoreSlotConfigStoreRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<StoreSlotConfigStoreRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<StoreSlotConfigStoreRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoreSlotConfigStoreRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type StoreSlotConfigStoreRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoreSlotConfigStoreRelationInventoryRelationProductRelation = {
  __typename?: 'StoreSlotConfigStoreRelationInventoryRelationProductRelation';
  category?: Maybe<StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<StoreSlotConfigStoreRelationInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<StoreSlotConfigStoreRelationInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type StoreSlotConfigStoreRelationInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type StoreSlotConfigStoreRelationInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'StoreSlotConfigStoreRelationInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigStoreRelationInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'StoreSlotConfigStoreRelationInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigStoreRelationInventoryRelationProductRelationStoreRelation = {
  __typename?: 'StoreSlotConfigStoreRelationInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigStoreRelationInventoryRelationStoreRelation = {
  __typename?: 'StoreSlotConfigStoreRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigStoreRelationProductsRelation = {
  __typename?: 'StoreSlotConfigStoreRelationProductsRelation';
  category?: Maybe<StoreSlotConfigStoreRelationProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<StoreSlotConfigStoreRelationProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<StoreSlotConfigStoreRelationProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoreSlotConfigStoreRelationProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type StoreSlotConfigStoreRelationProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type StoreSlotConfigStoreRelationProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoreSlotConfigStoreRelationProductsRelationCategoryRelation = {
  __typename?: 'StoreSlotConfigStoreRelationProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<StoreSlotConfigStoreRelationProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type StoreSlotConfigStoreRelationProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type StoreSlotConfigStoreRelationProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'StoreSlotConfigStoreRelationProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigStoreRelationProductsRelationInventoryRelation = {
  __typename?: 'StoreSlotConfigStoreRelationProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<StoreSlotConfigStoreRelationProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<StoreSlotConfigStoreRelationProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoreSlotConfigStoreRelationProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type StoreSlotConfigStoreRelationProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoreSlotConfigStoreRelationProductsRelationInventoryRelationProductRelation = {
  __typename?: 'StoreSlotConfigStoreRelationProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigStoreRelationProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'StoreSlotConfigStoreRelationProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigStoreRelationProductsRelationStoreRelation = {
  __typename?: 'StoreSlotConfigStoreRelationProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoreSlotConfigUpdateInput = {
  capacityPerSlot?: InputMaybe<Scalars['Int']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  dayEndMinutes?: InputMaybe<Scalars['Int']['input']>;
  dayStartMinutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  slotDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
};

export type StoresAddressFilters = {
  OR?: InputMaybe<Array<StoresAddressfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresAddressfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresCommissionPctFilters = {
  OR?: InputMaybe<Array<StoresCommissionPctfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresCommissionPctfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresContactEmailFilters = {
  OR?: InputMaybe<Array<StoresContactEmailfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresContactEmailfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresContactPhoneFilters = {
  OR?: InputMaybe<Array<StoresContactPhonefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresContactPhonefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresCreatedAtFilters = {
  OR?: InputMaybe<Array<StoresCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresFilters = {
  OR?: InputMaybe<Array<StoresFiltersOr>>;
  address?: InputMaybe<StoresAddressFilters>;
  commissionPct?: InputMaybe<StoresCommissionPctFilters>;
  contactEmail?: InputMaybe<StoresContactEmailFilters>;
  contactPhone?: InputMaybe<StoresContactPhoneFilters>;
  createdAt?: InputMaybe<StoresCreatedAtFilters>;
  id?: InputMaybe<StoresIdFilters>;
  isActive?: InputMaybe<StoresIsActiveFilters>;
  lat?: InputMaybe<StoresLatFilters>;
  lng?: InputMaybe<StoresLngFilters>;
  name?: InputMaybe<StoresNameFilters>;
  partnerName?: InputMaybe<StoresPartnerNameFilters>;
  serviceRadiusM?: InputMaybe<StoresServiceRadiusMFilters>;
  type?: InputMaybe<StoresTypeFilters>;
  updatedAt?: InputMaybe<StoresUpdatedAtFilters>;
};

export type StoresFiltersOr = {
  address?: InputMaybe<StoresAddressFilters>;
  commissionPct?: InputMaybe<StoresCommissionPctFilters>;
  contactEmail?: InputMaybe<StoresContactEmailFilters>;
  contactPhone?: InputMaybe<StoresContactPhoneFilters>;
  createdAt?: InputMaybe<StoresCreatedAtFilters>;
  id?: InputMaybe<StoresIdFilters>;
  isActive?: InputMaybe<StoresIsActiveFilters>;
  lat?: InputMaybe<StoresLatFilters>;
  lng?: InputMaybe<StoresLngFilters>;
  name?: InputMaybe<StoresNameFilters>;
  partnerName?: InputMaybe<StoresPartnerNameFilters>;
  serviceRadiusM?: InputMaybe<StoresServiceRadiusMFilters>;
  type?: InputMaybe<StoresTypeFilters>;
  updatedAt?: InputMaybe<StoresUpdatedAtFilters>;
};

export type StoresIdFilters = {
  OR?: InputMaybe<Array<StoresIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresInsertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  commissionPct?: InputMaybe<Scalars['Int']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  partnerName?: InputMaybe<Scalars['String']['input']>;
  serviceRadiusM?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<StoresTypeEnum>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type StoresInventoryRelation = {
  __typename?: 'StoresInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<StoresInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<StoresInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoresInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type StoresInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoresInventoryRelationProductRelation = {
  __typename?: 'StoresInventoryRelationProductRelation';
  category?: Maybe<StoresInventoryRelationProductRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<StoresInventoryRelationProductRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<StoresInventoryRelationProductRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoresInventoryRelationProductRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type StoresInventoryRelationProductRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type StoresInventoryRelationProductRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoresInventoryRelationProductRelationCategoryRelation = {
  __typename?: 'StoresInventoryRelationProductRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<StoresInventoryRelationProductRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type StoresInventoryRelationProductRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type StoresInventoryRelationProductRelationCategoryRelationProductsRelation = {
  __typename?: 'StoresInventoryRelationProductRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresInventoryRelationProductRelationInventoryRelation = {
  __typename?: 'StoresInventoryRelationProductRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresInventoryRelationProductRelationStoreRelation = {
  __typename?: 'StoresInventoryRelationProductRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresInventoryRelationStoreRelation = {
  __typename?: 'StoresInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresIsActiveFilters = {
  OR?: InputMaybe<Array<StoresIsActivefiltersOr>>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresIsActivefiltersOr = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresItem = {
  __typename?: 'StoresItem';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresLatFilters = {
  OR?: InputMaybe<Array<StoresLatfiltersOr>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresLatfiltersOr = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresLngFilters = {
  OR?: InputMaybe<Array<StoresLngfiltersOr>>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresLngfiltersOr = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Float']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresNameFilters = {
  OR?: InputMaybe<Array<StoresNamefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresNamefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresOrderBy = {
  address?: InputMaybe<InnerOrder>;
  commissionPct?: InputMaybe<InnerOrder>;
  contactEmail?: InputMaybe<InnerOrder>;
  contactPhone?: InputMaybe<InnerOrder>;
  createdAt?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  isActive?: InputMaybe<InnerOrder>;
  lat?: InputMaybe<InnerOrder>;
  lng?: InputMaybe<InnerOrder>;
  name?: InputMaybe<InnerOrder>;
  partnerName?: InputMaybe<InnerOrder>;
  serviceRadiusM?: InputMaybe<InnerOrder>;
  type?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
};

export type StoresPartnerNameFilters = {
  OR?: InputMaybe<Array<StoresPartnerNamefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresPartnerNamefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresProductsRelation = {
  __typename?: 'StoresProductsRelation';
  category?: Maybe<StoresProductsRelationCategoryRelation>;
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inventory: Array<StoresProductsRelationInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  store?: Maybe<StoresProductsRelationStoreRelation>;
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoresProductsRelationCategoryArgs = {
  where?: InputMaybe<CategoriesFilters>;
};


export type StoresProductsRelationInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type StoresProductsRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoresProductsRelationCategoryRelation = {
  __typename?: 'StoresProductsRelationCategoryRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<StoresProductsRelationCategoryRelationProductsRelation>;
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
};


export type StoresProductsRelationCategoryRelationProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type StoresProductsRelationCategoryRelationProductsRelation = {
  __typename?: 'StoresProductsRelationCategoryRelationProductsRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresProductsRelationInventoryRelation = {
  __typename?: 'StoresProductsRelationInventoryRelation';
  id: Scalars['String']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  product?: Maybe<StoresProductsRelationInventoryRelationProductRelation>;
  productId: Scalars['String']['output'];
  stockQty: Scalars['Int']['output'];
  store?: Maybe<StoresProductsRelationInventoryRelationStoreRelation>;
  storeId: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoresProductsRelationInventoryRelationProductArgs = {
  where?: InputMaybe<ProductsFilters>;
};


export type StoresProductsRelationInventoryRelationStoreArgs = {
  where?: InputMaybe<StoresFilters>;
};

export type StoresProductsRelationInventoryRelationProductRelation = {
  __typename?: 'StoresProductsRelationInventoryRelationProductRelation';
  categoryId: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emoji?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  markup?: Maybe<Scalars['Int']['output']>;
  markupType?: Maybe<ProductsMarkupTypeEnum>;
  mrp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Int']['output']>;
  price: Scalars['Int']['output'];
  storeId?: Maybe<Scalars['String']['output']>;
  /** JSON */
  timeBoundSections: Scalars['String']['output'];
  trackInventory: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresProductsRelationInventoryRelationStoreRelation = {
  __typename?: 'StoresProductsRelationInventoryRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresProductsRelationStoreRelation = {
  __typename?: 'StoresProductsRelationStoreRelation';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type StoresSelectItem = {
  __typename?: 'StoresSelectItem';
  address: Scalars['String']['output'];
  commissionPct?: Maybe<Scalars['Int']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inventory: Array<StoresInventoryRelation>;
  isActive: Scalars['Boolean']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  partnerName?: Maybe<Scalars['String']['output']>;
  products: Array<StoresProductsRelation>;
  serviceRadiusM: Scalars['Int']['output'];
  type: StoresTypeEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type StoresSelectItemInventoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InventoryOrderBy>;
  where?: InputMaybe<InventoryFilters>;
};


export type StoresSelectItemProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProductsOrderBy>;
  where?: InputMaybe<ProductsFilters>;
};

export type StoresServiceRadiusMFilters = {
  OR?: InputMaybe<Array<StoresServiceRadiusMfiltersOr>>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresServiceRadiusMfiltersOr = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresTypeEnum =
  /** Value: DARK_STORE */
  | 'DARK_STORE'
  /** Value: THIRD_PARTY */
  | 'THIRD_PARTY';

export type StoresTypeFilters = {
  OR?: InputMaybe<Array<StoresTypefiltersOr>>;
  eq?: InputMaybe<StoresTypeEnum>;
  gt?: InputMaybe<StoresTypeEnum>;
  gte?: InputMaybe<StoresTypeEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<StoresTypeEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<StoresTypeEnum>;
  lte?: InputMaybe<StoresTypeEnum>;
  ne?: InputMaybe<StoresTypeEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<StoresTypeEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresTypefiltersOr = {
  eq?: InputMaybe<StoresTypeEnum>;
  gt?: InputMaybe<StoresTypeEnum>;
  gte?: InputMaybe<StoresTypeEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<StoresTypeEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<StoresTypeEnum>;
  lte?: InputMaybe<StoresTypeEnum>;
  ne?: InputMaybe<StoresTypeEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<StoresTypeEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  commissionPct?: InputMaybe<Scalars['Int']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partnerName?: InputMaybe<Scalars['String']['input']>;
  serviceRadiusM?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<StoresTypeEnum>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type StoresUpdatedAtFilters = {
  OR?: InputMaybe<Array<StoresUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type StoresUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type TimeBoundSection = {
  __typename?: 'TimeBoundSection';
  endHour: Scalars['Int']['output'];
  id: TimeBoundSectionId;
  isNow: Scalars['Boolean']['output'];
  startHour: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  window: Scalars['String']['output'];
};

export type TimeBoundSectionId =
  | 'BREAKFAST'
  | 'DINNER'
  | 'LUNCH';

export type UsersAddressesRelation = {
  __typename?: 'UsersAddressesRelation';
  city: Scalars['String']['output'];
  /** Date */
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  lng: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  pincode: Scalars['String']['output'];
  /** Date */
  updatedAt: Scalars['String']['output'];
  user?: Maybe<UsersAddressesRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type UsersAddressesRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type UsersAddressesRelationUserRelation = {
  __typename?: 'UsersAddressesRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type UsersCreatedAtFilters = {
  OR?: InputMaybe<Array<UsersCreatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersCreatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersEmailFilters = {
  OR?: InputMaybe<Array<UsersEmailfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersEmailfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersFilters = {
  OR?: InputMaybe<Array<UsersFiltersOr>>;
  createdAt?: InputMaybe<UsersCreatedAtFilters>;
  email?: InputMaybe<UsersEmailFilters>;
  id?: InputMaybe<UsersIdFilters>;
  name?: InputMaybe<UsersNameFilters>;
  phone?: InputMaybe<UsersPhoneFilters>;
  role?: InputMaybe<UsersRoleFilters>;
  updatedAt?: InputMaybe<UsersUpdatedAtFilters>;
};

export type UsersFiltersOr = {
  createdAt?: InputMaybe<UsersCreatedAtFilters>;
  email?: InputMaybe<UsersEmailFilters>;
  id?: InputMaybe<UsersIdFilters>;
  name?: InputMaybe<UsersNameFilters>;
  phone?: InputMaybe<UsersPhoneFilters>;
  role?: InputMaybe<UsersRoleFilters>;
  updatedAt?: InputMaybe<UsersUpdatedAtFilters>;
};

export type UsersIdFilters = {
  OR?: InputMaybe<Array<UsersIdfiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersIdfiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersInsertInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  role?: InputMaybe<UsersRoleEnum>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type UsersItem = {
  __typename?: 'UsersItem';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type UsersNameFilters = {
  OR?: InputMaybe<Array<UsersNamefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersNamefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersOrderBy = {
  createdAt?: InputMaybe<InnerOrder>;
  email?: InputMaybe<InnerOrder>;
  id?: InputMaybe<InnerOrder>;
  name?: InputMaybe<InnerOrder>;
  phone?: InputMaybe<InnerOrder>;
  role?: InputMaybe<InnerOrder>;
  updatedAt?: InputMaybe<InnerOrder>;
};

export type UsersPhoneFilters = {
  OR?: InputMaybe<Array<UsersPhonefiltersOr>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPhonefiltersOr = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersRoleEnum =
  /** Value: admin */
  | 'admin'
  /** Value: customer */
  | 'customer';

export type UsersRoleFilters = {
  OR?: InputMaybe<Array<UsersRolefiltersOr>>;
  eq?: InputMaybe<UsersRoleEnum>;
  gt?: InputMaybe<UsersRoleEnum>;
  gte?: InputMaybe<UsersRoleEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<UsersRoleEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<UsersRoleEnum>;
  lte?: InputMaybe<UsersRoleEnum>;
  ne?: InputMaybe<UsersRoleEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<UsersRoleEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersRolefiltersOr = {
  eq?: InputMaybe<UsersRoleEnum>;
  gt?: InputMaybe<UsersRoleEnum>;
  gte?: InputMaybe<UsersRoleEnum>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<UsersRoleEnum>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<UsersRoleEnum>;
  lte?: InputMaybe<UsersRoleEnum>;
  ne?: InputMaybe<UsersRoleEnum>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<UsersRoleEnum>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersSelectItem = {
  __typename?: 'UsersSelectItem';
  addresses: Array<UsersAddressesRelation>;
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  sessions: Array<UsersSessionsRelation>;
  /** Date */
  updatedAt: Scalars['String']['output'];
};


export type UsersSelectItemAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AddressesOrderBy>;
  where?: InputMaybe<AddressesFilters>;
};


export type UsersSelectItemSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SessionsOrderBy>;
  where?: InputMaybe<SessionsFilters>;
};

export type UsersSessionsRelation = {
  __typename?: 'UsersSessionsRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  /** Date */
  expiresAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<UsersSessionsRelationUserRelation>;
  userId: Scalars['String']['output'];
};


export type UsersSessionsRelationUserArgs = {
  where?: InputMaybe<UsersFilters>;
};

export type UsersSessionsRelationUserRelation = {
  __typename?: 'UsersSessionsRelationUserRelation';
  /** Date */
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UsersRoleEnum;
  /** Date */
  updatedAt: Scalars['String']['output'];
};

export type UsersUpdateInput = {
  /** Date */
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UsersRoleEnum>;
  /** Date */
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type UsersUpdatedAtFilters = {
  OR?: InputMaybe<Array<UsersUpdatedAtfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UsersUpdatedAtfiltersOr = {
  /** Date */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lt?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  lte?: InputMaybe<Scalars['String']['input']>;
  /** Date */
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type AdminSetupStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminSetupStatusQuery = { __typename?: 'Query', adminSetupStatus: { __typename?: 'AdminSetupStatus', isRequired: boolean } };

export type AdminSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminSessionQuery = { __typename?: 'Query', adminSession?: { __typename?: 'AdminSession', expiresAt?: string | null, user: { __typename?: 'AdminUser', id: string, email?: string | null, name: string, phone: string, role: string } } | null };

export type AdminSetupMutationVariables = Exact<{
  secret: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminSetupMutation = { __typename?: 'Mutation', adminSetup: { __typename?: 'AdminSession', expiresAt?: string | null, user: { __typename?: 'AdminUser', id: string, email?: string | null, name: string, phone: string, role: string } } };

export type AdminLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminLoginMutation = { __typename?: 'Mutation', adminLogin: { __typename?: 'AdminSession', expiresAt?: string | null, user: { __typename?: 'AdminUser', id: string, email?: string | null, name: string, phone: string, role: string } } };

export type AdminLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type AdminLogoutMutation = { __typename?: 'Mutation', adminLogout: boolean };

export type AdminDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminDashboardQuery = { __typename?: 'Query', adminDashboard: { __typename?: 'AdminDashboard', todaysOrders: number, placedOrders: number, processingOrders: number, lowStockItems: number } };

export type AdminProductsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AdminProductsQuery = { __typename?: 'Query', adminProducts: { __typename?: 'AdminProductsPage', page: number, total: number, items: Array<{ __typename?: 'AdminProduct', id: string, name: string, description?: string | null, unit: string, mrp: number, price: number, originalPrice?: number | null, markup?: number | null, markupType?: MarkupType | null, imageUrl?: string | null, timeBoundSections: Array<TimeBoundSectionId>, trackInventory: boolean, storeId?: string | null, isActive: boolean, store?: { __typename?: 'AdminStore', id: string, name: string } | null, category: { __typename?: 'AdminCategory', id: string, name: string } }> } };

export type AdminProductQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminProductQuery = { __typename?: 'Query', adminProduct?: { __typename?: 'AdminProduct', id: string, name: string, description?: string | null, unit: string, mrp: number, price: number, originalPrice?: number | null, markup?: number | null, markupType?: MarkupType | null, imageUrl?: string | null, timeBoundSections: Array<TimeBoundSectionId>, trackInventory: boolean, storeId?: string | null, isActive: boolean, categoryId: string, createdAt: string, updatedAt: string, store?: { __typename?: 'AdminStore', id: string, name: string, type: AdminStoreType } | null, category: { __typename?: 'AdminCategory', id: string, name: string }, inventory: Array<{ __typename?: 'AdminInventoryItem', id: string, storeId: string, stockQty: number, lowStockThreshold: number, updatedAt: string, store?: { __typename?: 'AdminStore', id: string, name: string, type: AdminStoreType } | null }> } | null };

export type TimeBoundSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type TimeBoundSectionsQuery = { __typename?: 'Query', timeBoundSections: Array<{ __typename?: 'TimeBoundSection', id: TimeBoundSectionId, title: string, window: string, startHour: number, endHour: number, isNow: boolean }> };

export type AdminCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminCategoriesQuery = { __typename?: 'Query', adminCategories: Array<{ __typename?: 'AdminCategory', id: string, name: string, slug: string, sortOrder: number }> };

export type AdminCategoryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminCategoryQuery = { __typename?: 'Query', adminCategory?: { __typename?: 'AdminCategory', id: string, name: string, slug: string, sortOrder: number, createdAt: string } | null };

export type CreateAdminProductMutationVariables = Exact<{
  categoryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  unit: Scalars['String']['input'];
  mrp: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  markup?: InputMaybe<Scalars['Int']['input']>;
  markupType?: InputMaybe<MarkupType>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  timeBoundSections?: InputMaybe<Array<TimeBoundSectionId> | TimeBoundSectionId>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CreateAdminProductMutation = { __typename?: 'Mutation', createAdminProduct: { __typename?: 'AdminProduct', id: string } };

export type BulkCreateAdminProductsMutationVariables = Exact<{
  products: Array<AdminProductInput> | AdminProductInput;
}>;


export type BulkCreateAdminProductsMutation = { __typename?: 'Mutation', bulkCreateAdminProducts: Array<{ __typename?: 'AdminProduct', id: string, name: string, price: number, storeId?: string | null }> };

export type UpdateAdminProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  mrp?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  originalPrice?: InputMaybe<Scalars['Int']['input']>;
  markup?: InputMaybe<Scalars['Int']['input']>;
  markupType?: InputMaybe<MarkupType>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  timeBoundSections?: InputMaybe<Array<TimeBoundSectionId> | TimeBoundSectionId>;
  trackInventory?: InputMaybe<Scalars['Boolean']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateAdminProductMutation = { __typename?: 'Mutation', updateAdminProduct: { __typename?: 'AdminProduct', id: string } };

export type RegisterAdminDeviceMutationVariables = Exact<{
  fid: Scalars['String']['input'];
  userAgent?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterAdminDeviceMutation = { __typename?: 'Mutation', registerAdminDevice: boolean };

export type UnregisterAdminDeviceMutationVariables = Exact<{
  fid: Scalars['String']['input'];
}>;


export type UnregisterAdminDeviceMutation = { __typename?: 'Mutation', unregisterAdminDevice: boolean };

export type CreateAdminCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateAdminCategoryMutation = { __typename?: 'Mutation', createAdminCategory: { __typename?: 'AdminCategory', id: string } };

export type BulkCreateAdminCategoriesMutationVariables = Exact<{
  categories: Array<AdminCategoryInput> | AdminCategoryInput;
}>;


export type BulkCreateAdminCategoriesMutation = { __typename?: 'Mutation', bulkCreateAdminCategories: Array<{ __typename?: 'AdminCategory', id: string, name: string, slug: string, sortOrder: number }> };

export type UpdateAdminCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateAdminCategoryMutation = { __typename?: 'Mutation', updateAdminCategory: { __typename?: 'AdminCategory', id: string } };

export type AdminStoresQueryVariables = Exact<{
  type?: InputMaybe<AdminStoreType>;
}>;


export type AdminStoresQuery = { __typename?: 'Query', adminStores: Array<{ __typename?: 'AdminStore', id: string, name: string, type: AdminStoreType, partnerName?: string | null, contactPhone?: string | null, contactEmail?: string | null, commissionPct?: number | null, address: string, lat: number, lng: number, serviceRadiusM: number, isActive: boolean }> };

export type AdminStoreQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminStoreQuery = { __typename?: 'Query', adminStore?: { __typename?: 'AdminStore', id: string, name: string, type: AdminStoreType, partnerName?: string | null, contactPhone?: string | null, contactEmail?: string | null, commissionPct?: number | null, address: string, lat: number, lng: number, serviceRadiusM: number, isActive: boolean, createdAt: string, updatedAt: string } | null };

export type CreateAdminStoreMutationVariables = Exact<{
  name: Scalars['String']['input'];
  type?: InputMaybe<AdminStoreType>;
  partnerName?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  commissionPct?: InputMaybe<Scalars['Int']['input']>;
  address: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  serviceRadiusM?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CreateAdminStoreMutation = { __typename?: 'Mutation', createAdminStore: { __typename?: 'AdminStore', id: string } };

export type BulkCreateAdminStoresMutationVariables = Exact<{
  stores: Array<AdminStoreInput> | AdminStoreInput;
}>;


export type BulkCreateAdminStoresMutation = { __typename?: 'Mutation', bulkCreateAdminStores: Array<{ __typename?: 'AdminStore', id: string, name: string, type: AdminStoreType }> };

export type UpdateAdminStoreMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AdminStoreType>;
  partnerName?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  commissionPct?: InputMaybe<Scalars['Int']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  serviceRadiusM?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateAdminStoreMutation = { __typename?: 'Mutation', updateAdminStore: { __typename?: 'AdminStore', id: string } };

export type AdminInventoryQueryVariables = Exact<{
  storeId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  lowStockOnly: Scalars['Boolean']['input'];
}>;


export type AdminInventoryQuery = { __typename?: 'Query', adminInventory: { __typename?: 'AdminInventoryPage', page: number, limit: number, total: number, items: Array<{ __typename?: 'AdminInventoryItem', id: string, stockQty: number, lowStockThreshold: number, updatedAt: string, product: { __typename?: 'AdminProduct', id: string, name: string, imageUrl?: string | null } }> } };

export type AdjustAdminInventoryMutationVariables = Exact<{
  inventoryId: Scalars['String']['input'];
  delta: Scalars['Int']['input'];
  reason: Scalars['String']['input'];
}>;


export type AdjustAdminInventoryMutation = { __typename?: 'Mutation', adjustAdminInventory: { __typename?: 'AdminInventoryItem', id: string, stockQty: number } };

export type AdminOrdersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  status?: InputMaybe<AdminOrderStatus>;
}>;


export type AdminOrdersQuery = { __typename?: 'Query', adminOrders: { __typename?: 'AdminOrdersPage', page: number, limit: number, total: number, items: Array<{ __typename?: 'AdminOrder', id: string, status: AdminOrderStatus, total: number, placedAt: string, customer: { __typename?: 'AdminUser', id: string, name: string, email?: string | null, phone: string }, store: { __typename?: 'AdminStore', id: string, name: string } }> } };

export type AdminOrderQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminOrderQuery = { __typename?: 'Query', adminOrder?: { __typename?: 'AdminOrder', id: string, status: AdminOrderStatus, subtotal: number, deliveryFee: number, discount: number, total: number, paymentMethod: string, placedAt: string, allowedNextStatuses: Array<AdminOrderStatus>, customer: { __typename?: 'AdminUser', id: string, name: string, email?: string | null, phone: string }, store: { __typename?: 'AdminStore', id: string, name: string }, address: { __typename?: 'AdminOrderAddress', line1: string, line2?: string | null, city: string, pincode: string }, items: Array<{ __typename?: 'AdminOrderItem', id: string, name: string, unit: string, unitPrice: number, mrp: number, quantity: number }>, history: Array<{ __typename?: 'AdminOrderStatusHistory', fromStatus?: AdminOrderStatus | null, toStatus: AdminOrderStatus, reason?: string | null, createdAt: string }> } | null };

export type TransitionAdminOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  status: AdminOrderStatus;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type TransitionAdminOrderMutation = { __typename?: 'Mutation', transitionAdminOrder: { __typename?: 'AdminOrder', id: string, status: AdminOrderStatus } };

export type AdminCustomersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
}>;


export type AdminCustomersQuery = { __typename?: 'Query', adminCustomers: { __typename?: 'AdminCustomersPage', page: number, limit: number, total: number, items: Array<{ __typename?: 'AdminUser', id: string, name: string, phone: string, email?: string | null, role: string, createdAt?: string | null, updatedAt?: string | null }> } };

export type AdminCustomerQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminCustomerQuery = { __typename?: 'Query', adminCustomer?: { __typename?: 'AdminUser', id: string, name: string, phone: string, email?: string | null, role: string, createdAt?: string | null, updatedAt?: string | null } | null };

export type UpdateAdminCustomerMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAdminCustomerMutation = { __typename?: 'Mutation', updateAdminCustomer: { __typename?: 'AdminUser', id: string, name: string, phone: string, email?: string | null } };


export const AdminSetupStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSetupStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSetupStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRequired"}}]}}]}}]} as unknown as DocumentNode<AdminSetupStatusQuery, AdminSetupStatusQueryVariables>;
export const AdminSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<AdminSessionQuery, AdminSessionQueryVariables>;
export const AdminSetupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminSetup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secret"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSetup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"secret"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secret"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<AdminSetupMutation, AdminSetupMutationVariables>;
export const AdminLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<AdminLoginMutation, AdminLoginMutationVariables>;
export const AdminLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogout"}}]}}]} as unknown as DocumentNode<AdminLogoutMutation, AdminLogoutMutationVariables>;
export const AdminDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todaysOrders"}},{"kind":"Field","name":{"kind":"Name","value":"placedOrders"}},{"kind":"Field","name":{"kind":"Name","value":"processingOrders"}},{"kind":"Field","name":{"kind":"Name","value":"lowStockItems"}}]}}]}}]} as unknown as DocumentNode<AdminDashboardQuery, AdminDashboardQueryVariables>;
export const AdminProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackInventory"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"Argument","name":{"kind":"Name","value":"trackInventory"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackInventory"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"mrp"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"markup"}},{"kind":"Field","name":{"kind":"Name","value":"markupType"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timeBoundSections"}},{"kind":"Field","name":{"kind":"Name","value":"trackInventory"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminProductsQuery, AdminProductsQueryVariables>;
export const AdminProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"mrp"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"markup"}},{"kind":"Field","name":{"kind":"Name","value":"markupType"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timeBoundSections"}},{"kind":"Field","name":{"kind":"Name","value":"trackInventory"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}},{"kind":"Field","name":{"kind":"Name","value":"stockQty"}},{"kind":"Field","name":{"kind":"Name","value":"lowStockThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminProductQuery, AdminProductQueryVariables>;
export const TimeBoundSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TimeBoundSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeBoundSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"window"}},{"kind":"Field","name":{"kind":"Name","value":"startHour"}},{"kind":"Field","name":{"kind":"Name","value":"endHour"}},{"kind":"Field","name":{"kind":"Name","value":"isNow"}}]}}]}}]} as unknown as DocumentNode<TimeBoundSectionsQuery, TimeBoundSectionsQueryVariables>;
export const AdminCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]} as unknown as DocumentNode<AdminCategoriesQuery, AdminCategoriesQueryVariables>;
export const AdminCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AdminCategoryQuery, AdminCategoryQueryVariables>;
export const CreateAdminProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdminProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mrp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originalPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markup"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markupType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MarkupType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeBoundSections"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TimeBoundSectionId"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackInventory"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdminProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unit"}}},{"kind":"Argument","name":{"kind":"Name","value":"mrp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mrp"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"originalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originalPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"markup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markup"}}},{"kind":"Argument","name":{"kind":"Name","value":"markupType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markupType"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeBoundSections"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeBoundSections"}}},{"kind":"Argument","name":{"kind":"Name","value":"trackInventory"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackInventory"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAdminProductMutation, CreateAdminProductMutationVariables>;
export const BulkCreateAdminProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkCreateAdminProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"products"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminProductInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkCreateAdminProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"products"},"value":{"kind":"Variable","name":{"kind":"Name","value":"products"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"storeId"}}]}}]}}]} as unknown as DocumentNode<BulkCreateAdminProductsMutation, BulkCreateAdminProductsMutationVariables>;
export const UpdateAdminProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdminProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mrp"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originalPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markup"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markupType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MarkupType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeBoundSections"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TimeBoundSectionId"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackInventory"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unit"}}},{"kind":"Argument","name":{"kind":"Name","value":"mrp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mrp"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"originalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originalPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"markup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markup"}}},{"kind":"Argument","name":{"kind":"Name","value":"markupType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markupType"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeBoundSections"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeBoundSections"}}},{"kind":"Argument","name":{"kind":"Name","value":"trackInventory"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackInventory"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAdminProductMutation, UpdateAdminProductMutationVariables>;
export const RegisterAdminDeviceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterAdminDevice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAgent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerAdminDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fid"}}},{"kind":"Argument","name":{"kind":"Name","value":"userAgent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAgent"}}}]}]}}]} as unknown as DocumentNode<RegisterAdminDeviceMutation, RegisterAdminDeviceMutationVariables>;
export const UnregisterAdminDeviceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnregisterAdminDevice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregisterAdminDevice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fid"}}}]}]}}]} as unknown as DocumentNode<UnregisterAdminDeviceMutation, UnregisterAdminDeviceMutationVariables>;
export const CreateAdminCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdminCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdminCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAdminCategoryMutation, CreateAdminCategoryMutationVariables>;
export const BulkCreateAdminCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkCreateAdminCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminCategoryInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkCreateAdminCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}}]}}]} as unknown as DocumentNode<BulkCreateAdminCategoriesMutation, BulkCreateAdminCategoriesMutationVariables>;
export const UpdateAdminCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdminCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAdminCategoryMutation, UpdateAdminCategoryMutationVariables>;
export const AdminStoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminStores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminStoreType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminStores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"partnerName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"commissionPct"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"serviceRadiusM"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<AdminStoresQuery, AdminStoresQueryVariables>;
export const AdminStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"partnerName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"commissionPct"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"serviceRadiusM"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminStoreQuery, AdminStoreQueryVariables>;
export const CreateAdminStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdminStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminStoreType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partnerName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactPhone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commissionPct"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lat"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lng"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceRadiusM"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdminStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"partnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"contactPhone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactPhone"}}},{"kind":"Argument","name":{"kind":"Name","value":"contactEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"commissionPct"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commissionPct"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"lat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lat"}}},{"kind":"Argument","name":{"kind":"Name","value":"lng"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lng"}}},{"kind":"Argument","name":{"kind":"Name","value":"serviceRadiusM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceRadiusM"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAdminStoreMutation, CreateAdminStoreMutationVariables>;
export const BulkCreateAdminStoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkCreateAdminStores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stores"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminStoreInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkCreateAdminStores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stores"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stores"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<BulkCreateAdminStoresMutation, BulkCreateAdminStoresMutationVariables>;
export const UpdateAdminStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdminStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminStoreType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partnerName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactPhone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commissionPct"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lat"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lng"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceRadiusM"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"partnerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partnerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"contactPhone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactPhone"}}},{"kind":"Argument","name":{"kind":"Name","value":"contactEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"commissionPct"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commissionPct"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"lat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lat"}}},{"kind":"Argument","name":{"kind":"Name","value":"lng"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lng"}}},{"kind":"Argument","name":{"kind":"Name","value":"serviceRadiusM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceRadiusM"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAdminStoreMutation, UpdateAdminStoreMutationVariables>;
export const AdminInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lowStockOnly"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"lowStockOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lowStockOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stockQty"}},{"kind":"Field","name":{"kind":"Name","value":"lowStockThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminInventoryQuery, AdminInventoryQueryVariables>;
export const AdjustAdminInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdjustAdminInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delta"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adjustAdminInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inventoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inventoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"delta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delta"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stockQty"}}]}}]}}]} as unknown as DocumentNode<AdjustAdminInventoryMutation, AdjustAdminInventoryMutationVariables>;
export const AdminOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminOrderStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"placedAt"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminOrdersQuery, AdminOrdersQueryVariables>;
export const AdminOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryFee"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"placedAt"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"pincode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"mrp"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromStatus"}},{"kind":"Field","name":{"kind":"Name","value":"toStatus"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"allowedNextStatuses"}}]}}]}}]} as unknown as DocumentNode<AdminOrderQuery, AdminOrderQueryVariables>;
export const TransitionAdminOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransitionAdminOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminOrderStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transitionAdminOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<TransitionAdminOrderMutation, TransitionAdminOrderMutationVariables>;
export const AdminCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCustomers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCustomers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<AdminCustomersQuery, AdminCustomersQueryVariables>;
export const AdminCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminCustomerQuery, AdminCustomerQueryVariables>;
export const UpdateAdminCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAdminCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateAdminCustomerMutation, UpdateAdminCustomerMutationVariables>;