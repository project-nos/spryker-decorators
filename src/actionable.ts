/**
 * Copyright (c) Andreas Penz
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { initializeActionable, observeActionable } from '@project-nos/decorators';
import { ComponentConstructor } from './component.js';

export const actionable = (): any => {
    return (...args: any[]) => {
        const [target, context] = args as [ComponentConstructor, ClassDecoratorContext];

        if (context.kind !== 'class') {
            throw new TypeError('The @actionable decorator is for use on classes only.');
        }

        return class extends target {
            constructor(...args: any[]) {
                super(args);
                initializeActionable(this, this);
            }

            mountCallback() {
                super.mountCallback();
                observeActionable(this);
            }
        };
    };
};
