"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "@/config/axios.config";
import Input from "@/components/atoms/input";
import { MdWebStories } from "react-icons/md";
import Checkbox from "@/components/atoms/checkbox";

const NewCompanyForm = () => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        const countries = data.map((country: any) => country.name.common);
        setCountries(countries.sort());
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "company-name": "",
      website: "",
      email: "",
      gstin: "",
      "street-address": "",
      city: "",
      state: "",
      "postal-code": "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-gray-900 my-4">
        Register New Company
      </h1>
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Company Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <Input
                  id="company-name"
                  name="company-name"
                  required
                  label="Company Name"
                  type="text"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: "Company name is required",
                    },
                  }}
                  error={!!errors["company-name"]}
                  helperText={errors["company-name"]?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <Input
                  id="email"
                  required
                  name="email"
                  label="Email Address"
                  type="email"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: "Email Address is required",
                    },
                  }}
                  error={!!errors["email"]}
                  helperText={errors["email"]?.message}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>

            <div className="col-span-3 sm:col-span-2">
              <Input
                id="website"
                required
                name="website"
                label="Website"
                type="text"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Website is required",
                  },
                  pattern: {
                    value:
                      /^((http|https):\/\/)?(www\.)?([a-zA-Z0-9]+)\.([a-z]{2,})$/,
                    message: "Invalid website url",
                  },
                }}
                error={!!errors["website"]}
                helperText={errors["website"]?.message}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center space-x-5">
                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
                >
                  Change
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover photo
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-blue-700 hover:text-blue-600"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Demographics
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <Input
                  id="gstin"
                  required
                  name="gstin"
                  label="GSTIN Number"
                  type="text"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: "GSTIN is required",
                    },
                  }}
                  error={!!errors["gstin"]}
                  helperText={errors["gstin"]?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Select Country</option>
                  {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <Input
                  id="street-address"
                  required
                  name="street-address"
                  label="Street Address"
                  type="text"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: "Street Address is required",
                    },
                  }}
                  error={!!errors["street-address"]}
                  helperText={errors["street-address"]?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <Input
                  id="city"
                  required
                  name="city"
                  label="City"
                  type="text"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: "City Name is required",
                    },
                  }}
                  error={!!errors["city"]}
                  helperText={errors["city"]?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <Input
                  id="state"
                  required
                  name="state"
                  label="State/Province"
                  type="text"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: "State/Province is required",
                    },
                  }}
                  error={!!errors["state"]}
                  helperText={errors["state"]?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <Input
                  id="postal-code"
                  required
                  name="postal-code"
                  label="ZIP / Postal Code"
                  type="text"
                  register={register}
                  rules={{
                    required: {
                      value: true,
                      message: "ZIP / Postal Code is required",
                    },
                  }}
                  error={!!errors["postal-code"]}
                  helperText={errors["postal-code"]?.message}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Decide which communications you&apos;d like to receive and how.
            </p>
          </div>
          <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
            <fieldset>
              <legend className="sr-only">By Email</legend>
              <div
                className="text-base font-medium text-gray-900"
                aria-hidden="true"
              >
                By Email
              </div>
              <div className="mt-4 space-y-4">
                <Checkbox
                  id="comments"
                  labelClassName="font-medium text-gray-700"
                  name="comments"
                  label="Comments"
                  register={register}
                />
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-700"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-700"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="contents text-base font-medium text-gray-900">
                Push Notifications
              </legend>
              <p className="text-sm text-gray-500">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-blue-600 "
                  />
                  <label
                    htmlFor="push-everything"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-blue-600 "
                  />
                  <label
                    htmlFor="push-email"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-blue-600 "
                  />
                  <label
                    htmlFor="push-nothing"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Create Company
        </button>
      </div>
    </form>
  );
};

export default NewCompanyForm;
