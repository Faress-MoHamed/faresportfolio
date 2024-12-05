import { Github,Twitter ,Linkedin ,Instagram , type LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Accounts = [
    {
        accountLink: "https://github.com/example1",
        icon: Github,
    },
    {
        accountLink: "https://github.com/example2",
        icon: Twitter ,
    },
    {
        accountLink: "https://github.com/example3",
        icon: Linkedin ,
    },
    {
        accountLink: "https://github.com/example4",
        icon: Instagram ,
    },
];

export default function SocialMediaAccounts() {
    return (
        <div className="flex space-x-4 mb-2 mt-4">
            {Accounts.map((el, idx) => (
                <LinkAccount key={idx} accountLink={el.accountLink} Icon={el.icon} />
            ))}
        </div>
    );
}

const LinkAccount = ({
    accountLink,
    Icon,
}: {
    accountLink: string;
    Icon: LucideIcon;
}) => {
    return (
        <div className={"flex"}>
            <Link
                className="group flex text-sm font-medium transition bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
                href={accountLink}
            >
                {<Icon className="h-6 w-6 flex-none text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition" />}
            </Link>
        </div>
    );
};
