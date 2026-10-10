
export const CustomFullScreenLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Cargando...</p>
        </div>
    )
}
