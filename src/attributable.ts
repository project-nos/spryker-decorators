/**
 * Copyright (c) Andreas Penz
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    initializeAttributable,
    observeAttributable,
    AttributeOptions,
    AttributeDecoratorContext,
    initializeAttribute,
    AttributableDecoratorContext,
} from '@project-nos/decorators';
import { Component, ComponentConstructor } from './component.js';

export const attribute = (options: AttributeOptions): any => {
    return (_: unknown, context: AttributeDecoratorContext<Component, any>) => {
        if (context.kind !== 'accessor' && context.kind !== 'setter') {
            throw new Error('The @attribute decorator is for use on accessors and setters only.');
        }

        initializeAttribute(context, options);
    };
};

export const attributable = (): any => {
    return (target: ComponentConstructor, context: AttributableDecoratorContext<ComponentConstructor>) => {
        const { metadata } = context;

        if (context.kind !== 'class') {
            throw new TypeError('The @attributable decorator is for use on classes only.');
        }

        return class extends target {
            constructor(...args: any[]) {
                super(args);
                initializeAttributable(this, context);
            }

            mountCallback() {
                super.mountCallback();
                observeAttributable(this, metadata);
            }
        };
    };
};
