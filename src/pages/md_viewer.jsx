import { Title } from "../components/layout";
import { MarkdownCard } from "../components/cards";
import { CommentSection } from "../components/comments";

export function MD_Viewer({ filename, postID }) {
    return (
        <div>
            <Title />
            <MarkdownCard filename={filename} />
            <CommentSection postID={postID} />
        </div>
    );
}