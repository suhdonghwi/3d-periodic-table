import AtomInfo from "../../types/AtomInfo";

type Prop = { name: string; property: (v: AtomInfo) => number | undefined };
export type Category = { category: string; props: Prop[] };

export default Category;
