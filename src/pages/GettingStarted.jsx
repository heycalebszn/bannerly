import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const people = [
    { id: 1, name: "Software Engineer/Developer" },
    { id: 2, name: "Designer" },
    { id: 3, name: "Both" },
];

export default function GettingStarted() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(people[1]);

    const filteredPeople =
        query === ""
            ? people
            : people.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <>
        <Header/>
            <div className="flex flex-col items-center justify-center text-left gap-6 lg:h-[80vh]">
                <h1 className=" text-lg md:text-3xl lg:text-4xl font-medium text-white text-center flex mt-[3vh]">
                    Please Choose your Field!👨‍🍳
                </h1>

                <div className="flex flex-col items-center justify-left text-left gap-6">
                    <Combobox
                        value={selected}
                        onChange={(value) => setSelected(value)}
                        onClose={() => setQuery("")}
                    >
                        <div className="relative max-w-[400px] w-[80vw]">
                            <ComboboxInput
                                className={clsx(
                                    "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-[18px] text-white",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                )}
                                displayValue={(person) => person?.name}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                            </ComboboxButton>
                        </div>

                        <ComboboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                                "w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                            )}
                        >
                            {filteredPeople.map((person) => (
                                <ComboboxOption
                                    key={person.id}
                                    value={person}
                                    className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                >
                                    <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                    <div className="md:text-[18px] text-white text-[15px]">
                                        {person.name}
                                    </div>
                                </ComboboxOption>
                            ))}
                        </ComboboxOptions>
                    </Combobox>

                    <Link to={"/form"}>
                        <button className="bg-white text-purple-700 text-lg p-2 rounded-lg font-semibold inline-block mt-28 hover:text-white hover:bg-purple-700 transition ease delay-75 lg:px-4">
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
