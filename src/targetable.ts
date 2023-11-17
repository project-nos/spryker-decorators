/**
 * Copyright (c) Andreas Penz
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    initializeTarget,
    initializeTargetable,
    initializeTargets,
    TargetDecoratorContext,
    TargetsDecoratorContext,
    TargetableDecoratorContext,
} from '@project-nos/decorators';
import { Component, ComponentConstructor } from './component.js';

export const target = (): any => {
    return (_: unknown, context: TargetDecoratorContext<Component, Element | undefined>) => {
        if (context.kind !== 'accessor') {
            throw new TypeError('The @target decorator is for use on accessors only.');
        }

        initializeTarget(context);
    };
};

export const targets = (): any => {
    return (_: unknown, context: TargetsDecoratorContext<Component, Element[]>) => {
        if (context.kind !== 'accessor') {
            throw new TypeError('The @targets decorator is for use on accessors only.');
        }

        initializeTargets(context);
    };
};

export const targetable = (): any => {
    return (target: ComponentConstructor, context: TargetableDecoratorContext<ComponentConstructor>) => {
        const { metadata } = context;

        if (context.kind !== 'class') {
            throw new TypeError('The @targetable decorator is for use on classes only.');
        }

        return class extends target {
            constructor(...args: any[]) {
                super(args);
                initializeTargetable(this, metadata);
            }
        };
    };
};
