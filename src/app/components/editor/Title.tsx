
import { Dispatch, SetStateAction } from "react";

interface Props {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>;
}
export default function Title ({ title, setTitle }: Props) {
    return (
        <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setTitle(e.target.value)}
            value={title} />
        </div>
    )
}