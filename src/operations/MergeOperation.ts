import Operation from "./Operation";

export default class MergeOperation extends Operation {

    name() {
        return "merge";
    }

    processInObject(keywordValue: MergeKeywordValue, target?: any) {
        // Process $merge.source property without a target
        const processedSourceProperty = this._processor.processSourcePropertyInNewScope(keywordValue.source, "source");

        // Process $merge.with property and use the processed $merge.source property as target
        const processedWithProperty = this._processor.processSourcePropertyInNewScope(keywordValue.with, "with", processedSourceProperty);

        // Process $merge result and use the original target as target but do not process operations
        this._processor.disableOperations();
        const result = this._processor.processSourceInNewScope(processedWithProperty, target);
        this._processor.enableOperations();

        return result;
    }
}

/*
 * TYPES
 */

export interface MergeKeywordValue {
    "source": any; // the value to merge
    "with": any; // the value to merge with
}
