import Category from "@/components/custom/category";

export default function CategoriesSection({ records }) {
    // // Busco prods filtrados por id de categoria cliqueada
    // async function retrieveFilteredProds(event) {
    //     const { data: registros } = await supabase
    //         .from("Product")
    //         .select("*")
    //         .eq('category_id', record.id);

    //     console.table(registros);

    //     event.currentTarget.className.add('font-medium');
    //     setIsActive(!isActive);
    // }

    return (
        <div>
            {records?.map((category) => (
                <div key={category.id}>
                    <Category record={category}></Category>
                </div>
            ))}
        </div>
    )
}
