import { Title } from "../components/layout";
import { MarkdownCard } from "../components/cards";

export function MD_Viewer({ filename }) {
    return (
        <div>
            <Title />
            <MarkdownCard filename={filename} />
        </div>
    );
}