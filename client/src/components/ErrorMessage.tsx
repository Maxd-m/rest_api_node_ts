interface ErrorMessageProps {
    message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
            {message}
        </div>
    )
}