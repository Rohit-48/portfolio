type Props = {
    params: Promise<{ slug: string }>;
};

export default async function Project({ params }: Props) {
    const { slug } = await params;

    return (
        <div className="font-bold">
            <h1> Project: {slug}</h1>
        </div>
    )
}