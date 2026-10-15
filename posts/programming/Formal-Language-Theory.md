## Regular Expression
Regular expressions describe regular languages in formal language theory. They have the same expressive power as regular grammars. But the language of regular expressions itself, is context-free language.

### Formal definition
Regular expressions consist of constants, which denote sets of strings, and operator symbols, which denote operations over these sets. The following definition is standard, and found as such in most textbooks on formal language theory. Given a finite alphabet $\Sigma$, the following constants are defined as regular expressions:

- (empty set) $\emptyset$ denoting the set $\emptyset$.
- (empty string) $\varepsilon$ denoting the set containing only the "empty" string, which has no characters at all.
- (literal character) $a \in \Sigma$ denoting the set containing only the character $a$.

Given regular expressions $R$ and $S$, the following operations over them are defined to produce regular expressions recursively:

- (concatenation) $(RS)$ denotes the set of strings that can be obtained by concatenating a string accepted by $R$ and a string accepted by $S$ (in that order). For example, let $R$ denote $\{"ab", "c"\}$ and $S$ denote $\{"d", "ef"\}$. Then, $(RS)$ denotes $\{"abd", "abef", "cd", "cef"\}$.
- (alternation) $(R|S)$ denotes the set union of sets described by $R$ and $S$. For example, if $R$ describes $\{"ab", "c"\}$ and $S$ describes $\{"ab", "d", "ef"\}$, expression $(R|S)$ describes $\{"ab", "c", "d", "ef"\}$.
- (Kleene star) $(R^{*})$ denotes the smallest superset of the set described by $R$ that contains $\varepsilon$ and is closed under string concatenation. This is the set of all strings that can be made by concatenating any finite number (including zero) of strings from the set described by $R$. For example, if $R$ denotes $\{"0", "1"\}$, $(R^{*})$ denotes the set of all finite binary strings (including the empty string). If $R$ denotes $\{"ab", "c"\}$, $(R^{*})$ denotes $\{\varepsilon, "ab", "c", "abab", "abc", "cab", "cc", "ababab", "abcab", ...\}$.
To avoid parentheses, it is assumed that the Kleene star has the highest priority followed by concatenation, then alternation. If there is no ambiguity, then parentheses may be omitted. For example, $(ab)c$ can be written as $abc$, and $a|(b(c^{*}))$ can be written as $a|bc*$. Many textbooks use the symbols $\cup$, $+$, or $\vee$ for alternation instead of the vertical bar.

Examples:

a|b* denotes {ε, "a", "b", "bb", "bbb", ...}
(a|b)* denotes the set of all strings with no symbols other than "a" and "b", including the empty string: {ε, "a", "b", "aa", "ab", "ba", "bb", "aaa", ...}
ab*(c|ε) denotes the set of strings starting with "a", then zero or more "b"s and finally optionally a "c": {"a", "ac", "ab", "abc", "abb", "abbc", ...}
(0|(1(01*0)*1))* denotes the set of binary numbers that are multiples of 3: { ε, "0", "00", "11", "000", "011", "110", "0000", "0011", "0110", "1001", "1100", "1111", "00000", ...}
The derivative of a regular expression can be defined using the Brzozowski derivative.