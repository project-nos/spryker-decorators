/**
 * Copyright (c) Andreas Penz
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    initializeActionable,
    initializeAttributable,
    observeActionable,
    observeAttributable,
    ControllableDecoratorContext,
    initializeTargetable,
} from '@project-nos/decorators';
import { ComponentConstructor } from './component.js';

export const controllable = (): any => {
    return (target: ComponentConstructor, context: ControllableDecoratorContext<ComponentConstructor>) => {
        const { metadata } = context;

        return class extends target {
            constructor(...args: any[]) {
                super(args);
                initializeActionable(this, this);
                initializeAttributable(this, metadata);
                initializeTargetable(this, metadata);
            }

            mountCallback() {
                super.mountCallback();
                observeActionable(this);
                observeAttributable(this, metadata);
            }
        };
    };
};
