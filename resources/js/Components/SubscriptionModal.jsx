import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe();

export default function SubscriptionModal({ isOpen, subscription, plans, onClose }) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <div aria-hidden="true" className="fixed inset-0 bg-black bg-opacity-25"/>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-jusyiify-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leaveFrom="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Subscription Required
                                </Dialog.Title>
                                <div className="mt-2 space-y-3">
                                    <p className="text-sm text-gray-500">
                                        You need to subscribe to access this feature.
                                    </p>
                                    <Elements stripe={stripePromise}>
                                    </Elements>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
