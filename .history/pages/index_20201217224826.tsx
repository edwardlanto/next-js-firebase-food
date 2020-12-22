
export default function Home({ }) {
    return (
        <div>
            Home
        </div>
    )
}

// This gets called on every request
export const getStaticProps = async (context) => {
    return {
        props: {
            data: "TEST"
        },
    }
}
