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
} from '@project-nos/decorators';
import { Component, ComponentConstructor } from './component.js';

export const attribute = (options: AttributeOptions): any => {
    return (...args: any[]) => {
        const [_, context] = args as [unknown, AttributeDecoratorContext<Component, unknown>];

        if (context.kind !== 'accessor') {
            throw new TypeError('The @attribute decorator is for use on accessors only.');
        }

        initializeAttribute(context, options);
    };
};

export const attributable = (): any => {
    return (...args: any[]) => {
        const [target, context] = args as [ComponentConstructor, ClassDecoratorContext];
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
