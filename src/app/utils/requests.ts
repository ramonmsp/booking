import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Booking } from '../lib/mocks/booking';
import { Property } from '../lib/mocks/properties';

export const BASE_URL = 'http://localhost:3000/api';

//http verbs
const http = {
  get: async (url: string, options = {}) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  },
  patch: async (url: string, { arg }: { arg: Partial<Booking> }) => {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(arg),
    });

    const data = await response.json();
    return data;
  },
  post: async (url: string, { arg }: { arg: Partial<Booking> }) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    });

    const data = await response.json();
    return data;
  },
  delete: async (url: string) => {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data;
  },
};

//property
export function useGetProperties<Property>(url: string) {
  const { data, error } = useSWR<Property>(url, http.get);

  return {
    properties: data,
    error,
  };
}

export function useGetPropertyById(url: string) {
  const { data, error } = useSWR<Property[]>(url, http.get);

  return {
    property: data,
    error,
  };
}

//booking
export function useGetBookings<Booking>(url: string) {
  const { data, error, mutate } = useSWR<Booking>(url, http.get);

  return {
    bookings: data,
    error,
    mutate,
  };
}

/*
  This hook is called undesirably when the modal component is unmounted.
  Disabling the revalidate settings prevented other requests, but not this one.
  Then, when unmount the deletion modal, the application will make a request 
  to the API requesting the booking that was just deleted.
*/
export function useGetBookingById(url: string) {
  const { data, error } = useSWR<Booking>(url, http.get, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  return {
    booking: data,
    error,
  };
}

export function useCreateBooking(url: string) {
  const { trigger, isMutating } = useSWRMutation(url, http.post);

  return { trigger, isMutating };
}

export function useEditBooking(url: string) {
  const { trigger, isMutating } = useSWRMutation(url, http.patch);

  return { trigger, isMutating };
}

export function useDeleteBooking(url: string) {
  const { trigger, isMutating } = useSWRMutation(url, http.delete);

  return { trigger, isMutating };
}

export const useMutate = (url: string) => {
  const { trigger, isMutating } = useSWRMutation(url, http.delete);

  return { trigger, isMutating };
};
