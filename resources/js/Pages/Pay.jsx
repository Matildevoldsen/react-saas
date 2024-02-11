import {Link, Head, usePage} from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import SubscriptionModal from "@/Components/SubscriptionModal.jsx";
import {useEffect, useState} from "react";

export default function Pay({ auth, subscription, plan, plans }) {
    const { props } = usePage();
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!props.isSubscribed) {
            setModalOpen(true);
        }
    }, [props.isSubscribed]);

    return (
        <Authenticated user={auth.user}>
            <Head title="Home" />

            <SubscriptionModal
                isOpen={isModalOpen}
                plans={plans}
                subscription={subscription}
                onClose={() => setModalOpen(false)}
            />
        </Authenticated>
    );
}
